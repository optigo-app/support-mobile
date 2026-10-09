import React, { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Button, Snackbar } from "@mui/material";
import localVersionData from "../version.json";

const CHECK_INTERVAL_MS = 45000;
const REQUEST_TIMEOUT_MS = 12000;

const getBuildId = (versionData) =>
  versionData?.fullVersion || versionData?.buildHash || versionData?.version;

export const useVersionChecker = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [latestBuildId, setLatestBuildId] = useState("");
  const isCheckingRef = useRef(false);

  const checkForUpdate = useCallback(async () => {
    if (isCheckingRef.current) return;
    isCheckingRef.current = true;
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const publicUrl = (process.env.PUBLIC_URL || "").replace(/\/$/, "");
      const versionUrl = new URL(`${publicUrl}/version.json`, window.location.origin);
      versionUrl.searchParams.set("t", Date.now().toString());

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

      if (!response.ok) return;

      const serverVersionData = await response.json();
      const serverBuildId = getBuildId(serverVersionData);
      const currentBuildId = getBuildId(localVersionData);

      if (serverBuildId && currentBuildId && serverBuildId !== currentBuildId) {
        setLatestBuildId(serverBuildId);
        setUpdateAvailable(true);
        setNoticeOpen(true);
      }
    } catch {
      // Keep the running app usable when the version endpoint is unavailable.
    } finally {
      window.clearTimeout(timeoutId);
      isCheckingRef.current = false;
    }
  }, []);

  useEffect(() => {
    const initialTimer = window.setTimeout(checkForUpdate, 3000);
    const intervalId = window.setInterval(checkForUpdate, CHECK_INTERVAL_MS);
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") checkForUpdate();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", checkForUpdate);

    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", checkForUpdate);
    };
  }, [checkForUpdate]);

  const applyUpdate = useCallback(() => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("_build", latestBuildId || Date.now().toString());
    window.location.replace(currentUrl.toString());
  }, [latestBuildId]);

  const deferUpdate = useCallback(() => {
    // Keep the update pending and surface the notice again on the next check.
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
