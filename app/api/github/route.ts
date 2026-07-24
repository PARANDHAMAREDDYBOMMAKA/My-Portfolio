import { NextResponse } from "next/server";

const USER = "PARANDHAMAREDDYBOMMAKA";

// Revalidate the cached response hourly so we stay well under GitHub's
// unauthenticated rate limit while still showing fresh numbers.
export const revalidate = 3600;

interface Repo {
  name?: string;
  stargazers_count?: number;
  fork?: boolean;
  pushed_at?: string;
}

interface ContribDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export async function GET() {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "portfolio-gazette",
  };
  // Optional: set GITHUB_TOKEN in the environment for a higher rate limit.
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const [userRes, reposRes, contribRes, eventsRes] = await Promise.all([
      fetch(`https://api.github.com/users/${USER}`, {
        headers,
        next: { revalidate },
      }),
      fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`, {
        headers,
        next: { revalidate },
      }),
      fetch(`https://github-contributions-api.jogruber.de/v4/${USER}?y=last`, {
        next: { revalidate },
      }),
      fetch(`https://api.github.com/users/${USER}/events/public?per_page=30`, {
        headers,
        next: { revalidate },
      }),
    ]);

    const user = userRes.ok ? await userRes.json() : {};
    const repos: Repo[] = reposRes.ok ? await reposRes.json() : [];
    const contrib = contribRes.ok ? await contribRes.json() : null;

    // Most recent pushed commit, for the live ticker.
    let latestCommit: { message: string; repo: string } | null = null;
    if (eventsRes.ok) {
      const events = await eventsRes.json();
      if (Array.isArray(events)) {
        const push = events.find(
          (e: { type?: string; payload?: { commits?: { message: string }[] } }) =>
            e.type === "PushEvent" && e.payload?.commits?.length
        );
        if (push) {
          const commits = push.payload.commits;
          latestCommit = {
            message: commits[commits.length - 1].message.split("\n")[0].slice(0, 72),
            repo: (push.repo?.name || "").split("/").pop() || "",
          };
        }
      }
    }

    // Fallback when the events feed is unavailable/rate-limited: use the most
    // recently pushed repo so the ticker always has a live activity line.
    if (!latestCommit && Array.isArray(repos) && repos.length) {
      const recent = [...repos]
        .filter((r) => r.pushed_at)
        .sort((a, b) => (a.pushed_at! < b.pushed_at! ? 1 : -1))[0];
      if (recent?.name) {
        latestCommit = { message: "Latest push", repo: recent.name };
      }
    }

    const stars = Array.isArray(repos)
      ? repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)
      : 0;

    const days: ContribDay[] = Array.isArray(contrib?.contributions)
      ? contrib.contributions
      : [];
    const totalContributions = days.reduce((sum, d) => sum + (d.count || 0), 0);

    return NextResponse.json({
      ok: true,
      login: user.login ?? USER,
      repos: user.public_repos ?? null,
      followers: user.followers ?? null,
      following: user.following ?? null,
      gists: user.public_gists ?? null,
      stars,
      totalContributions,
      days,
      latestCommit,
    });
  } catch {
    // Never break the page — the components fall back to their own defaults.
    return NextResponse.json({ ok: false });
  }
}
