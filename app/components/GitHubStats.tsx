"use client";

import React, { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { useDevice } from "../hooks/useDevice";
import { GitBranch, Star, GitPullRequest, Code2, Zap, Award, Fish, Target } from "lucide-react";

interface StatItem {
  icon: React.ElementType;
  label: string;
  value: number;
  suffix?: string;
  color: string;
}

const stats: StatItem[] = [
  { icon: Code2, label: "Total Repos", value: 119, color: "#e07a5f" },
  { icon: GitBranch, label: "Contributions", value: 847, color: "#7fa67e" },
  { icon: GitPullRequest, label: "Pull Requests", value: 45, suffix: "+", color: "#e0a458" },
  { icon: Star, label: "Stars Earned", value: 12, color: "#efc07a" },
  { icon: Zap, label: "Commits", value: 1200, suffix: "+", color: "#ef7a52" },
  { icon: Award, label: "Achievements", value: 3, color: "#c98a6b" },
];

const achievements = [
  { name: "Pull Shark", count: 3, icon: Fish, color: "#7fa67e" },
  { name: "Quickdraw", count: 1, icon: Zap, color: "#e0a458" },
  { name: "YOLO", count: 1, icon: Target, color: "#e07a5f" },
];

const GitHubStats: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [counters, setCounters] = useState<number[]>(stats.map(() => 0));
  const hasAnimatedRef = useRef(false);
  const { isMobile } = useDevice();

  useEffect(() => {
    if (isInView && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true;

      stats.forEach((stat, index) => {
        const target = stat.value;
        const duration = 2000;
        const startTime = Date.now();

        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(eased * target);

          setCounters((prev) => {
            const newCounters = [...prev];
            newCounters[index] = current;
            return newCounters;
          });

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        setTimeout(() => {
          requestAnimationFrame(animate);
        }, index * 100);
      });
    }
  }, [isInView]);

  return (
    <div ref={sectionRef} className="py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-caption uppercase tracking-wider mb-2 block">GitHub Activity</span>
          <h3 className="text-2xl md:text-3xl font-bold text-(--text-primary)">Code & Contributions</h3>
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
