"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import { useInView } from "framer-motion";
import { useDevice } from "../hooks/useDevice";
import { GitBranch, Star, Users, Code2, UserPlus, FileCode2, Fish, Zap, Target } from "lucide-react";

interface StatItem {
  icon: React.ElementType;
  label: string;
  value: number;
  suffix?: string;
  color: string;
}

interface GitHubData {
  repos: number | null;
  followers: number | null;
  following: number | null;
  gists: number | null;
  stars: number;
  totalContributions: number;
}

const achievements = [
  { name: "Pull Shark", count: 3, icon: Fish, color: "#7fa67e" },
  { name: "Quickdraw", count: 1, icon: Zap, color: "#e0a458" },
  { name: "YOLO", count: 1, icon: Target, color: "#e07a5f" },
];

const GitHubStats: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { isMobile } = useDevice();

  const [data, setData] = useState<GitHubData | null>(null);

  // Pull the real numbers from our cached /api/github route.
  useEffect(() => {
    let alive = true;
    fetch("/api/github")
      .then((r) => r.json())
      .then((d) => {
        if (alive && d?.ok) setData(d);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  // Live stats where GitHub exposes them; sensible fallbacks until they load.
  const stats = useMemo<StatItem[]>(
    () => [
      { icon: Code2, label: "Public Repos", value: data?.repos ?? 119, color: "#c05a3d" },
      { icon: GitBranch, label: "Contributions", value: data?.totalContributions ?? 847, color: "#5f8a5e" },
      { icon: Star, label: "Stars Earned", value: data?.stars ?? 12, color: "#b8862b" },
      { icon: Users, label: "Followers", value: data?.followers ?? 0, color: "#c96a3a" },
      { icon: UserPlus, label: "Following", value: data?.following ?? 0, color: "#96691d" },
      { icon: FileCode2, label: "Public Gists", value: data?.gists ?? 0, color: "#9c4527" },
    ],
    [data]
  );

  const [counters, setCounters] = useState<number[]>(() => stats.map(() => 0));
  const animatedSigRef = useRef<string>("");

  useEffect(() => {
    if (!isInView) return;

    const targets = stats.map((s) => s.value);
    const sig = targets.join(",");
    if (animatedSigRef.current === sig) return; // already counted to these values
    animatedSigRef.current = sig;

    const frames: number[] = [];
    targets.forEach((target, index) => {
      const duration = 1600;
      const startTime = performance.now();
      const startVal = 0;

      const animate = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(startVal + (target - startVal) * eased);

        setCounters((prev) => {
          const next = [...prev];
          next[index] = current;
          return next;
        });

        if (progress < 1) frames[index] = requestAnimationFrame(animate);
      };

      window.setTimeout(() => {
        frames[index] = requestAnimationFrame(animate);
      }, index * 90);
    });

    return () => frames.forEach((f) => cancelAnimationFrame(f));
  }, [isInView, stats]);

  return (
    <div ref={sectionRef} className="py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="byline block mb-3">By the Numbers — the commit ledger</span>
          <h3 className="text-display text-3xl md:text-4xl text-(--text-primary)">Code &amp; Contributions</h3>
          <div className="hairline-gold w-24 mx-auto mt-5" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon as React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
            return (
            <div
              key={stat.label}
              className={`relative p-4 md:p-6 rounded-xl bg-(--bg-card) border border-(--border-subtle) hover:border-(--primary)/30 transition-all duration-300 text-center group ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at center, ${stat.color}15 0%, transparent 70%)`,
                }}
              />

              <div
                className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <Icon size={isMobile ? 20 : 24} style={{ color: stat.color }} />
              </div>

              <div className="text-2xl md:text-3xl font-bold text-(--text-primary) mb-1">
                <span>{counters[index]}</span>
                {stat.suffix && <span className="text-lg">{stat.suffix}</span>}
              </div>

              <span className="text-xs md:text-sm text-(--text-muted)">{stat.label}</span>
            </div>
            );
          })}
        </div>

        <div
          className={`p-6 md:p-8 rounded-2xl bg-(--bg-card) border border-(--border-subtle) transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <h4 className="text-lg font-semibold text-(--text-primary) mb-6 text-center">
            GitHub Achievements
          </h4>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {achievements.map((achievement) => {
              const AchIcon = achievement.icon as React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
              return (
              <div
                key={achievement.name}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-(--bg-elevated) border border-(--border-subtle) hover:border-(--primary)/30 transition-colors"
              >
                <span
                  className="flex items-center justify-center w-9 h-9 rounded-lg"
                  style={{ backgroundColor: `${achievement.color}20` }}
                >
                  <AchIcon size={18} style={{ color: achievement.color }} />
                </span>
                <div>
                  <span className="block text-sm font-medium text-(--text-primary)">
                    {achievement.name}
                  </span>
                  {achievement.count > 1 && (
                    <span className="text-xs text-(--text-muted)">×{achievement.count}</span>
                  )}
                </div>
              </div>
              );
            })}
          </div>

          <div className="mt-6 text-center">
            <a
              href="https://github.com/PARANDHAMAREDDYBOMMAKA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-(--primary) hover:bg-(--primary-dark) text-white font-medium transition-colors"
            >
              <GitBranch size={18} />
              View Full Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitHubStats;
