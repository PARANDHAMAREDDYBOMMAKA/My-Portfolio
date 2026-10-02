"use client";

import React, { useEffect, useState } from "react";

// Weather-code → short label + glyph (open-meteo WMO codes).
const weatherLabel = (code: number): string => {
  if (code === 0) return "Clear ☀";
  if (code <= 3) return "Partly cloudy ⛅";
  if (code <= 48) return "Fog 🌫";
  if (code <= 67) return "Rain 🌧";
  if (code <= 77) return "Snow 🌨";
  if (code <= 82) return "Showers 🌦";
  if (code <= 99) return "Thunder ⛈";
  return "—";
};

const NewsTicker: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    const base: string[] = [];

    // Live date — the edition's dateline.
    const today = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    base.push(`TODAY — ${today}`);

    const settle = (extra: string[]) => {
      setItems([
        ...base,
        ...extra,
        "STATUS — Open to GenAI & full-stack roles",
        "DESK — Filed from Hyderabad",
        "COFFEE LEVEL — Dangerously high ☕",
      ]);
    };

    Promise.allSettled([
      fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=17.385&longitude=78.4867&current=temperature_2m,weather_code"
      ).then((r) => r.json()),
      fetch("/api/github").then((r) => r.json()),
    ]).then(([weather, gh]) => {
      const extra: string[] = [];

      if (weather.status === "fulfilled" && weather.value?.current) {
        const c = weather.value.current;
        extra.push(
          `HYDERABAD — ${Math.round(c.temperature_2m)}°C, ${weatherLabel(c.weather_code)}`
        );
      }
      if (gh.status === "fulfilled" && gh.value?.ok) {
        const d = gh.value;
        if (d.latestCommit?.message) {
          extra.push(
            `LATEST COMMIT — "${d.latestCommit.message}"${
              d.latestCommit.repo ? ` → ${d.latestCommit.repo}` : ""
            }`
          );
        }
        if (typeof d.totalContributions === "number") {
          extra.push(`${d.totalContributions} contributions this year`);
        }
      }
      settle(extra);
    });
  }, []);

  if (!items.length) return null;

  // Duplicate the run so the marquee loops seamlessly.
  const run = [...items, ...items];

  return (
    <div className="ticker-mask overflow-hidden w-full border-y border-(--border-subtle) py-1.5 no-print">
      <div className="ticker-track inline-flex flex-nowrap whitespace-nowrap min-w-max">
        {run.map((item, i) => (
          <span
            key={i}
            className="byline inline-flex items-center shrink-0 normal-case tracking-normal"
          >
            <span className="text-(--text-secondary)">{item}</span>
            <span className="mx-4 text-(--accent)">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default NewsTicker;
