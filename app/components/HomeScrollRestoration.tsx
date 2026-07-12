"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

const STORAGE_KEY = "jack-landis-home-scroll";
const RETURN_KEY = "jack-landis-home-return-pending";

export default function HomeScrollRestoration() {
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);
  const isLeavingHome = useRef(false);
  const restoreTimers = useRef<number[]>([]);

  useEffect(() => {
    let saveTimer = 0;

    const savePosition = () => {
      window.clearTimeout(saveTimer);
      saveTimer = 0;
      sessionStorage.setItem(STORAGE_KEY, String(window.scrollY));
    };

    const scheduleSave = () => {
      window.clearTimeout(saveTimer);
      saveTimer = window.setTimeout(savePosition, 200);
    };

    const saveReturnPosition = () => {
      if (pathnameRef.current !== "/" || isLeavingHome.current) return;
      isLeavingHome.current = true;
      savePosition();
      sessionStorage.setItem(RETURN_KEY, "true");
    };

    const onLinkClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const link = (event.target as Element | null)?.closest("a[href]");
      if (!link || link.getAttribute("target") === "_blank") return;

      const destination = new URL(link.getAttribute("href") ?? "", window.location.href);
      if (destination.origin === window.location.origin && destination.pathname !== "/") {
        saveReturnPosition();
      }
    };

    const onScroll = () => {
      if (pathnameRef.current !== "/" || isLeavingHome.current) return;
      scheduleSave();
    };

    document.addEventListener("click", onLinkClick, { capture: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pagehide", saveReturnPosition);

    return () => {
      window.clearTimeout(saveTimer);
      restoreTimers.current.forEach(window.clearTimeout);
      document.removeEventListener("click", onLinkClick, { capture: true });
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", saveReturnPosition);
    };
  }, []);

  useLayoutEffect(() => {
    const previousPathname = pathnameRef.current;
    pathnameRef.current = pathname;

    restoreTimers.current.forEach(window.clearTimeout);
    restoreTimers.current = [];

    if (pathname !== "/") {
      document.documentElement.classList.remove("home-scroll-restoring");
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }

    const navigation = performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming | undefined;
    const isReload = navigation?.type === "reload";
    const isReturning = previousPathname !== "/" || sessionStorage.getItem(RETURN_KEY) === "true";

    isLeavingHome.current = false;
    if (!isReload && !isReturning) {
      document.documentElement.classList.remove("home-scroll-restoring");
      return;
    }

    const storedPosition = Number(sessionStorage.getItem(STORAGE_KEY));
    sessionStorage.removeItem(RETURN_KEY);
    if (!Number.isFinite(storedPosition)) return;

    history.scrollRestoration = "manual";
    document.documentElement.classList.add("home-scroll-restoring");

    let hasRestored = false;
    const restore = () => {
      if (hasRestored) return;
      hasRestored = true;
      restoreTimers.current.forEach(window.clearTimeout);
      restoreTimers.current = [];
      window.scrollTo({ top: storedPosition, behavior: "instant" });
      document.documentElement.classList.remove("home-scroll-restoring");
    };

    requestAnimationFrame(() => requestAnimationFrame(restore));
    restoreTimers.current = [window.setTimeout(restore, 100)];
  }, [pathname]);

  return null;
}
