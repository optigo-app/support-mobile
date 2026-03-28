import { useState, useEffect } from "react";
import { getGreeting } from "../utils/dateFormatter";

/**
 * Custom hook to provide a live-updating greeting based on the current time.
 * This runs in the "background" and "signals" the UI by updating state
 * whenever the time category (Morning, Afternoon, Evening, Night) changes.
 */
export const useGreeting = () => {
  const [greeting, setGreeting] = useState(getGreeting());

  useEffect(() => {
    // 1. Initial check (fallback)
    setGreeting(getGreeting());

    // 2. Listen for "Background Signal" from Service Worker
    const handleSWMessage = (event) => {
      if (event.data && (event.data.type === "GREETING_UPDATE" || event.data.greeting)) {
        setGreeting(event.data.greeting);
      }
    };

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", handleSWMessage);

      // Request immediate update from SW on mount
      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({ type: "CHECK_GREETING" });
      }
    }

    // 3. Cleanup listener on unmount
    return () => {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.removeEventListener("message", handleSWMessage);
      }
    };
  }, []);

  return greeting;
};
