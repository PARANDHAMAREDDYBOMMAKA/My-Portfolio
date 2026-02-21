"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useDevice } from "../hooks/useDevice";

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const generateMockContributions = (): ContributionDay[] => {
  const contributions: ContributionDay[] = [];
  const startDate = new Date("2025-02-21");
  startDate.setDate(startDate.getDate() - 365);

  for (let i = 0; i < 365; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    const seed = i * 7 + dayOfWeek;
    const probability = isWeekend ? 0.4 : 0.7;
    const hasContribution = seededRandom(seed) < probability;

    let count = 0;
    let level: 0 | 1 | 2 | 3 | 4 = 0;

    if (hasContribution) {
      const rand = seededRandom(seed * 2);
      const rand2 = seededRandom(seed * 3);
      if (rand < 0.3) {
        count = Math.floor(rand2 * 3) + 1;
        level = 1;
      } else if (rand < 0.6) {
        count = Math.floor(rand2 * 5) + 4;
        level = 2;
      } else if (rand < 0.85) {
        count = Math.floor(rand2 * 7) + 9;
        level = 3;
      } else {
        count = Math.floor(rand2 * 10) + 16;
        level = 4;
      }
    }

    contributions.push({
      date: date.toISOString().split("T")[0],
      count,
      level,
    });
  }

  return contributions;
};

const GitHubStreak: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { isMobile } = useDevice();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const contributions = useMemo(() => generateMockContributions(), []);

  const weeks = useMemo(() => {
    const result: ContributionDay[][] = [];
    let currentWeek: ContributionDay[] = [];

    contributions.forEach((day, index) => {
      const date = new Date(day.date);
      const dayOfWeek = date.getDay();

      if (index === 0 && dayOfWeek !== 0) {
        for (let i = 0; i < dayOfWeek; i++) {
          currentWeek.push({ date: "", count: 0, level: 0 });
        }
      }

      currentWeek.push(day);

      if (dayOfWeek === 6 || index === contributions.length - 1) {
        result.push(currentWeek);
        currentWeek = [];
      }
    });

    return result;
  }, [contributions]);

  const totalContributions = useMemo(() => {
    return contributions.reduce((sum, day) => sum + day.count, 0);
  }, [contributions]);

  const currentStreak = useMemo(() => {
    let streak = 0;
    for (let i = contributions.length - 1; i >= 0; i--) {
      if (contributions[i].count > 0) streak++;
      else break;
    }
    return streak;
  }, [contributions]);

  const longestStreak = useMemo(() => {
    let longest = 0;
    let current = 0;
    contributions.forEach((day) => {
      if (day.count > 0) {
        current++;
        longest = Math.max(longest, current);
      } else {
        current = 0;
      }
    });
    return longest;
  }, [contributions]);

  const getLevelColor = (level: number) => {
    const colors = [
      "bg-[#161b22]",
      "bg-[#0e4429]",
      "bg-[#006d32]",
      "bg-[#26a641]",
      "bg-[#39d353]",
    ];
    return colors[level] || colors[0];
  };

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  if (!isClient) {
    return (
      <div ref={ref} className="bg-(--bg-card) rounded-3xl p-6 md:p-8 border border-(--border-subtle)">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div>
            <h3 className="text-xl font-bold text-(--text-primary) mb-2">Contribution Graph</h3>
            <p className="text-sm text-(--text-muted)">Loading contributions...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="bg-(--bg-card) rounded-3xl p-6 md:p-8 border border-(--border-subtle)">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
        <div>
          <h3 className="text-xl font-bold text-(--text-primary) mb-2">Contribution Graph</h3>
          <p className="text-sm text-(--text-muted)">
            {totalContributions.toLocaleString()} contributions in the last year
          </p>
        </div>

        <div className="flex gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-(--text-primary)">{currentStreak}</div>
            <div className="text-xs text-(--text-muted)">Current Streak</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-(--text-primary)">{longestStreak}</div>
            <div className="text-xs text-(--text-muted)">Longest Streak</div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto pb-4">
        <div className="inline-block min-w-full">
          <div className="flex gap-1 text-xs text-(--text-muted) mb-2 ml-8">
            {months.map((month, i) => (
              <div key={month} className="flex-1 text-center" style={{ minWidth: "40px" }}>
                {i % 2 === 0 ? month : ""}
              </div>
            ))}
          </div>

          <div className="flex gap-1">
            <div className="flex flex-col gap-1 text-xs text-(--text-muted) mr-2">
              {["", "Mon", "", "Wed", "", "Fri", ""].map((day, i) => (
                <div key={i} className="h-3 flex items-center justify-end pr-1" style={{ fontSize: "10px" }}>
                  {day}
                </div>
              ))}
            </div>

            <div className="flex gap-0.75">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-0.75">
                  {week.map((day, dayIndex) => (
                    <motion.div
                      key={`${weekIndex}-${dayIndex}`}
                      initial={isMobile ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={isMobile ? { duration: 0 } : {
                        delay: (weekIndex * 7 + dayIndex) * 0.001,
                        duration: 0.2,
                      }}
                      className={`w-3 h-3 rounded-sm ${getLevelColor(day.level)} ${
                        day.date ? "hover:ring-1 hover:ring-white/30 cursor-pointer" : ""
                      }`}
                      title={day.date ? `${day.count} contributions on ${day.date}` : ""}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 mt-4 text-xs text-(--text-muted)">
            <span>Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`w-3 h-3 rounded-sm ${getLevelColor(level)}`}
              />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitHubStreak;
