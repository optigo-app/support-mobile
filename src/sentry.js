import * as Sentry from "@sentry/react";

const SENTRY_DSN = process.env.REACT_APP_SENTRY_DSN;

export function initSentry() {
  if (!SENTRY_DSN) {
    console.info("[Sentry] Ready for error tracking. To start sending reports, set REACT_APP_SENTRY_DSN in your .env file.");
    return;
  }

  Sentry.init({
    dsn: SENTRY_DSN,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
    // Tracing sample rate (100% in development, 20% in production)
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.2 : 1.0,
    // Session Replay sample rates
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    environment: process.env.NODE_ENV || "development",
    // Filter out expected intentional aborts so Sentry only tracks real issues
    ignoreErrors: [
      "AbortError",
      "Fetch is aborted",
      "The user aborted a request",
    ],
  });
}

export { Sentry };
