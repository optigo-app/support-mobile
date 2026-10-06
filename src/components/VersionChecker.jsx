import React, { useEffect, useRef } from "react";
import localVersionData from "../version.json";

/**
 * VersionChecker
 * 
 * Solves the issue where mobile WebViews keep running stale versions of the website.
 * 
 * Features:
 * 1. Checks `/version.json` with cache-busting timestamp `?t=${Date.now()}`.
 * 2. Triggers on:
 *    - Initial mount (delayed 3s so startup isn't blocked)
 *    - Visibility change (crucial for mobile WebView when user returns to app)
 *    - Window focus
 *    - Periodic interval (every 45s)
 * 3. When a new version is detected:
 *    - Cleans CacheStorage and unregisters stale service workers
 *    - Forces a clean reload with a cache-busting query parameter `_v`
 */
const CHECK_INTERVAL_MS = 45000; // 45 seconds

export const useVersionChecker = () => {
  const isUpdatingRef = useRef(false);

  useEffect(() => {
    const currentFullVersion = localVersionData?.fullVersion || localVersionData?.version;
    const currentHash = localVersionData?.buildHash;

    const performVersionCheck = async () => {
      if (isUpdatingRef.current) return;
      if (typeof window === "undefined" || !navigator.onLine) return;

      try {
        const response = await fetch(`/version.json?t=${Date.now()}`, {
          method: "GET",
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        });

        if (!response.ok) return;

        const serverVersionData = await response.json();
        const serverFullVersion = serverVersionData?.fullVersion || serverVersionData?.version;
        const serverHash = serverVersionData?.buildHash;

        const isNewVersion =
          (serverFullVersion && serverFullVersion !== currentFullVersion) ||
          (serverHash && serverHash !== currentHash);

        if (isNewVersion) {
          console.warn(
            `[VersionChecker] New build detected on server! (Server: ${serverFullVersion || serverHash} vs Local: ${currentFullVersion || currentHash}). Refreshing WebView...`
          );
          isUpdatingRef.current = true;

          // 1. Clear CacheStorage if supported
          if ("caches" in window) {
            try {
              const cacheKeys = await window.caches.keys();
              await Promise.all(cacheKeys.map((key) => window.caches.delete(key)));
            } catch (err) {
              console.error("[VersionChecker] Error clearing caches:", err);
            }
          }

          // 2. Unregister any stale service workers
          if ("serviceWorker" in navigator) {
            try {
              const registrations = await navigator.serviceWorker.getRegistrations();
              for (const registration of registrations) {
                await registration.unregister();
              }
            } catch (err) {
              console.error("[VersionChecker] Error unregistering service workers:", err);
            }
          }

          // 3. Force fresh reload in Mobile WebView
          // Appending _v timestamp query param forces Android/iOS WebViews to bypass disk cache
          try {
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.set("_v", serverHash || Date.now().toString());
            window.location.replace(currentUrl.toString());
          } catch (e) {
            window.location.reload(true);
          }
        }
      } catch (err) {
        // Network error or offline - silently ignore
      }
    };

    // Initial check after 3 seconds
    const initialTimer = setTimeout(performVersionCheck, 3000);

    // Periodic check interval
    const intervalId = setInterval(performVersionCheck, CHECK_INTERVAL_MS);

    // Mobile WebView check: when user switches back to the app / unlocks phone
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        performVersionCheck();
      }
    };

    window.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", performVersionCheck);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalId);
      window.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", performVersionCheck);
    };
  }, []);
};

export const VersionChecker = () => {
  useVersionChecker();
  return null;
};

export default VersionChecker;
