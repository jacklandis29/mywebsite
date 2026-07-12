"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: "America/New_York",
  timeZoneName: "short",
});

export default function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(formatter.format(now));
      const hour = Number(new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        hourCycle: "h23",
        timeZone: "America/New_York",
      }).format(now));
      const period = hour < 6 || hour >= 21 ? "night" : hour >= 17 ? "evening" : hour < 10 ? "morning" : "day";
      document.documentElement.dataset.ambience = period;
    };
    tick();
    const interval = setInterval(tick, 30_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="footer-locale">
      Washington, D.C.
      {time && (
        <>
          {" "}· <time>{time}</time>
        </>
      )}
    </span>
  );
}
