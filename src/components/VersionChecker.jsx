import React, { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Button, Snackbar } from "@mui/material";
import localVersionData from "../version.json";

// version.json is tiny; check periodically only while this page is visible.
const CHECK_INTERVAL_MS = 5 * 60 * 1000;
const REQUEST_TIMEOUT_MS = 12000;
const LOG_PREFIX = "[VersionChecker]";
const RELOAD_TARGET_KEY = "support-mobile:update-reload-target";

function getReloadTarget() {
  try {
    return sessionStorage.getItem(RELOAD_TARGET_KEY);
  } catch {
    return null;
  }
}

function setReloadTarget(buildId) {
  try {
    sessionStorage.setItem(RELOAD_TARGET_KEY, buildId);
  } catch {
    // Reload still proceeds when storage is unavailable; only the loop guard is lost.
  }
}

function clearReloadTarget() {
  try {
    sessionStorage.removeItem(RELOAD_TARGET_KEY);
  } catch {
    // Storage can be disabled in embedded browsers.
  }
}

const getBuildId = (versionData) =>
  versionData?.fullVersion || versionData?.buildHash || versionData?.version;

export const useVersionChecker = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [latestBuildId, setLatestBuildId] = useState("");
  const isCheckingRef = useRef(false);
  const registrationRef = useRef(null);
  const detectedBuildRef = useRef("");

  const reloadForBuild = useCallback((buildId) => {
    if (!buildId) return;

    // Clear a previous attempt after the new bundle has actually loaded.
    if (getBuildId(localVersionData) === buildId) {
      clearReloadTarget();
      return;
    }

    // A stale CDN response must not cause an infinite reload loop.
    if (getReloadTarget() === buildId) {
      console.warn(`${LOG_PREFIX} Reload already attempted for this build; leaving the manual update action available.`);
      return;
    }

    setReloadTarget(buildId);
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("_build", buildId);
    console.info(`${LOG_PREFIX} Reloading once to load build ${buildId}.`);
    window.location.replace(currentUrl.toString());
  }, []);

  const reportNewVersion = useCallback((buildId, source) => {
    const currentBuildId = getBuildId(localVersionData);
    if (!buildId || !currentBuildId || buildId === currentBuildId) return;

    if (detectedBuildRef.current !== buildId) {
      console.warn(
        "%c🚀 NEW VERSION DETECTED",
        "font-size: 24px; font-weight: 800; color: #1565c0; padding: 4px 0;"
      );
      console.warn(`${LOG_PREFIX} Build version mismatch.`, {
        source,
        currentBuildId,
        serverBuildId: buildId,
      });
    }

    detectedBuildRef.current = buildId;
    setLatestBuildId(buildId);
    setUpdateAvailable(true);
    setNoticeOpen(true);
    reloadForBuild(buildId);
  }, [reloadForBuild]);

  const checkForUpdate = useCallback(async (trigger = "scheduled check") => {
    if (isCheckingRef.current) {
      console.log(`${LOG_PREFIX} Skipping ${trigger}; another check is still running.`);
      return;
    }
    isCheckingRef.current = true;
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      registrationRef.current?.update().catch((error) => {
        console.warn(`${LOG_PREFIX} Service worker update check failed.`, error);
      });

      const publicUrl = (process.env.PUBLIC_URL || "").replace(/\/$/, "");
      const versionUrl = new URL(`${publicUrl}/version.json`, window.location.origin);
      versionUrl.searchParams.set("t", Date.now().toString());
      const currentBuildId = getBuildId(localVersionData);

      console.log(`${LOG_PREFIX} Checking for updates (${trigger}).`, {
        currentBuildId,
        endpoint: versionUrl.origin + versionUrl.pathname,
      });

      const response = await fetch(versionUrl.toString(), {
        method: "GET",
        cache: "no-store",
        signal: controller.signal,
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      });

      if (!response.ok) {
        console.error(`${LOG_PREFIX} Version check failed: HTTP ${response.status} ${response.statusText}.`, {
          endpoint: versionUrl.origin + versionUrl.pathname,
        });
        return;
      }

      const serverVersionData = await response.json();
      const serverBuildId = getBuildId(serverVersionData);

      if (!serverBuildId || !currentBuildId) {
        console.error(`${LOG_PREFIX} Version response is missing a build identifier.`, {
          currentBuildId,
          response: serverVersionData,
        });
        return;
      }

      if (serverBuildId !== currentBuildId) {
        reportNewVersion(serverBuildId, "version.json");
      } else {
        if (getReloadTarget() === currentBuildId) clearReloadTarget();
        console.log(`${LOG_PREFIX} App is up to date.`, { currentBuildId });
      }
    } catch (error) {
      if (error?.name === "AbortError") {
        console.error(`${LOG_PREFIX} Version check timed out after ${REQUEST_TIMEOUT_MS}ms.`);
      } else {
        console.error(`${LOG_PREFIX} Could not reach the version endpoint.`, error);
      }
    } finally {
      window.clearTimeout(timeoutId);
      isCheckingRef.current = false;
    }
  }, [reportNewVersion]);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      console.warn(`${LOG_PREFIX} Service workers are not supported in this WebView.`);
      return undefined;
    }

    let disposed = false;
    const handleServiceWorkerMessage = (event) => {
      if (event.data?.type !== "APP_BUILD_AVAILABLE") return;
      console.log(`${LOG_PREFIX} Received build ID from service worker.`, {
        buildId: event.data.buildId,
      });
      // version.json is authoritative if an older worker activates during rollout.
      checkForUpdate("service worker activation");
    };

    navigator.serviceWorker.addEventListener("message", handleServiceWorkerMessage);

    const publicUrl = (process.env.PUBLIC_URL || "").replace(/\/$/, "");
    const serviceWorkerUrl = new URL(
      `${publicUrl}/service-worker.js`,
      window.location.origin
    );

    navigator.serviceWorker
      .register(serviceWorkerUrl.toString(), { updateViaCache: "none" })
      .then((registration) => {
        if (disposed) return;
        registrationRef.current = registration;
        console.log(`${LOG_PREFIX} Service worker registered.`, {
          scope: registration.scope,
        });
        return registration.update().catch((error) => {
          console.warn(`${LOG_PREFIX} Initial service worker update check failed.`, error);
        });
      })
      .catch((error) => {
        console.error(`${LOG_PREFIX} Service worker registration failed.`, error);
      });

    return () => {
      disposed = true;
      navigator.serviceWorker.removeEventListener("message", handleServiceWorkerMessage);
      registrationRef.current = null;
    };
  }, [checkForUpdate]);

  useEffect(() => {
    console.log(`${LOG_PREFIX} Checker started.`, {
      currentBuildId: getBuildId(localVersionData),
      initialDelayMs: 1000,
      intervalMs: CHECK_INTERVAL_MS,
    });
    const initialTimer = window.setTimeout(() => checkForUpdate("startup"), 1000);
    const intervalId = window.setInterval(() => {
      if (document.visibilityState === "visible") checkForUpdate("5-minute interval");
    }, CHECK_INTERVAL_MS);
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") checkForUpdate("app became visible");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    const handleFocus = () => checkForUpdate("window focus");
    window.addEventListener("focus", handleFocus);

    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, [checkForUpdate]);

  const applyUpdate = useCallback(() => {
    console.log(`${LOG_PREFIX} User chose Update now.`, { buildId: latestBuildId });
    // Permit a second attempt when the first navigation was served stale HTML.
    clearReloadTarget();
    reloadForBuild(latestBuildId || Date.now().toString());
  }, [latestBuildId, reloadForBuild]);

  const deferUpdate = useCallback(() => {
    // Keep the update pending and surface the notice again on the next check.
    console.log(`${LOG_PREFIX} User chose Later; update remains pending.`);
    setNoticeOpen(false);
  }, []);

  return {
    updateAvailable,
    noticeOpen,
    applyUpdate,
    deferUpdate,
  };
};

export const VersionChecker = () => {
  const { updateAvailable, noticeOpen, applyUpdate, deferUpdate } = useVersionChecker();

  return (
    <Snackbar
      open={updateAvailable && noticeOpen}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{ mt: 1, zIndex: (theme) => theme.zIndex.tooltip }}
    >
      <Alert
        severity="info"
        variant="filled"
        action={
          <>
            <Button color="inherit" size="small" onClick={deferUpdate}>
              Later
            </Button>
            <Button color="inherit" size="small" onClick={applyUpdate}>
              Update now
            </Button>
          </>
        }
        sx={{ alignItems: "center", width: "100%" }}
      >
        New version detected. Update now to get the latest version.
      </Alert>
    </Snackbar>
  );
};

export default VersionChecker;
