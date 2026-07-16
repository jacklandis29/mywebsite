"use client";

import { useEffect, useRef } from "react";
import { playSound } from "../lib/sound";

const REVEAL_DISTANCE = 44;
const CHIME_COOLDOWN_MS = 6000;

export default function OverscrollReward() {
  const rewardRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const reward = rewardRef.current;
    if (!reward) return;

    let pull = 0;
    let touchY: number | null = null;
    let settleTimer: ReturnType<typeof setTimeout> | null = null;
    let lastChime = -Infinity;

    const isAtBottom = () =>
      window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;

    const render = () => {
      const progress = Math.min(pull / REVEAL_DISTANCE, 1);
      reward.style.setProperty("--overscroll-reveal", progress.toString());
      if (progress >= 1 && performance.now() - lastChime > CHIME_COOLDOWN_MS) {
        lastChime = performance.now();
        playSound("bloom");
        navigator.vibrate?.(8);
      }
    };

    const settle = () => {
      if (settleTimer) clearTimeout(settleTimer);
      settleTimer = setTimeout(() => {
        pull = 0;
        render();
      }, 110);
    };

    const onWheel = (event: WheelEvent) => {
      if (!isAtBottom() || event.deltaY <= 0) {
        if (!isAtBottom()) {
          pull = 0;
          render();
        }
        return;
      }

      pull = Math.min(pull + event.deltaY * 0.32, REVEAL_DISTANCE);
      render();
      settle();
    };

    const onTouchStart = (event: TouchEvent) => {
      touchY = event.touches[0]?.clientY ?? null;
      if (settleTimer) clearTimeout(settleTimer);
    };

    const onTouchMove = (event: TouchEvent) => {
      const nextY = event.touches[0]?.clientY;
      if (touchY === null || nextY === undefined) return;

      const delta = touchY - nextY;
      touchY = nextY;

      if (isAtBottom() && delta > 0) {
        pull = Math.min(pull + delta * 0.72, REVEAL_DISTANCE);
        render();
      } else if (!isAtBottom()) {
        pull = 0;
        render();
      }
    };

    const onTouchEnd = () => {
      touchY = null;
      settle();
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      if (settleTimer) clearTimeout(settleTimer);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);

  return (
    <p ref={rewardRef} className="overscroll-reward" aria-hidden="true">
      That&rsquo;s everything.
    </p>
  );
}
