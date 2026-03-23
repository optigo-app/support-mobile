// universal-pwa.js — drop-in replacement for CRA's serviceWorkerRegistration

const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    window.location.hostname === "[::1]" ||
    /^127(?:\.(?:25[0-5]|2[0-4]\d|[01]?\d?\d)){3}$/.test(window.location.hostname)
);

// Allow PWAs everywhere (fixes CRA restriction)
function safePublicUrl() {
  try {
    return new URL(process.env.PUBLIC_URL, window.location.href);
  } catch {
    return null;
  }
}

export function register(config = {}) {
  if (!("serviceWorker" in navigator)) return;
  if (process.env.NODE_ENV !== "production") return;

  const publicUrl = safePublicUrl();
  // Removed: CRA's origin blocking (breaks tunnels)

  window.addEventListener("load", () => {
    const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

    if (isLocalhost) {
      checkValidServiceWorker(swUrl, config);
      navigator.serviceWorker.ready.then(() => {
        console.log("PWA: Running in localhost mode");
      });
    } else {
      registerValidSW(swUrl, config);
    }
  });
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      console.log("PWA: Service worker registered");

      // Auto-refresh on update
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (!installingWorker) return;

        installingWorker.onstatechange = () => {
          if (installingWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              console.log("PWA: Update found");

              if (config.onUpdate) config.onUpdate(registration);

              // Auto-reload on new version
              window.location.reload();
            } else {
              console.log("PWA: Cached for offline");
              if (config.onSuccess) config.onSuccess(registration);
            }
          }
        };
      };
    })
    .catch((error) =>
      console.error("PWA: Error during service worker registration:", error)
    );
}

// Validates SW file on localhost & invalidates caches when needed
function checkValidServiceWorker(swUrl, config) {
  fetch(swUrl, { headers: { "Service-Worker": "script" } })
    .then((response) => {
      const contentType = response.headers.get("content-type");

      if (
        response.status === 404 ||
        (contentType && !contentType.includes("javascript"))
      ) {
        // Old/broken SW - remove it
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            console.log("PWA: Invalid SW removed");
            window.location.reload();
          });
        });
      } else {
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log("PWA: No internet connection — running offline");
    });
}

export function unregister() {
  if (!("serviceWorker" in navigator)) return;

  navigator.serviceWorker.ready
    .then((registration) => registration.unregister())
    .catch((error) => console.error(error.message));
}
