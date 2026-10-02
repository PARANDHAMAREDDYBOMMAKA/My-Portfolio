import { NextRequest, NextResponse } from "next/server";
import { projects } from "../../utils/data";

export const revalidate = 3600;

export async function GET(request: NextRequest) {
  const id = Number(request.nextUrl.searchParams.get("id"));
  const candidate = projects.find((p) => p.id === id && p.link);

  if (request.nextUrl.searchParams.has("check")) {
    if (!candidate?.link) return NextResponse.json({ live: false });
    try {
      const res = await fetch(candidate.link, {
        headers: { "User-Agent": "Mozilla/5.0 (portfolio preview)" },
        next: { revalidate },
      });
      const frameOptions = res.headers.get("x-frame-options");
      const csp = res.headers.get("content-security-policy") ?? "";
      const clerk = res.headers.get("x-clerk-auth-reason") ?? "";
      return NextResponse.json({
        live: res.ok && !frameOptions && !csp.includes("frame-ancestors") && !clerk.includes("dev-browser"),
      });
    } catch {
      return NextResponse.json({ live: false });
    }
  }

  const project = candidate?.proxy ? candidate : undefined;
  if (!project?.link) {
    return new NextResponse("Unknown preview", { status: 404 });
  }

  try {
    const res = await fetch(project.link, {
      headers: { "User-Agent": "Mozilla/5.0 (portfolio preview)" },
      next: { revalidate },
    });
    if (!res.ok) {
      return new NextResponse("Preview unavailable", { status: 502 });
    }

    const origin = new URL(res.url).origin;
    const html = (await res.text())
      .replace(/<script\b[\s\S]*?<\/script>/gi, "")
      .replace(/<link[^>]+rel="preload"[^>]*as="script"[^>]*>/gi, "")
      .replace(/<head([^>]*)>/i, `<head$1><base href="${origin}/" />`);

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Security-Policy": "sandbox; script-src 'none'; frame-ancestors 'self'",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new NextResponse("Preview unavailable", { status: 502 });
  }
}
