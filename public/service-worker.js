/* eslint-disable no-restricted-globals */
/**
 * Active Greeting Service - Service Worker
 * 
 * This worker runs in its own background thread, ensuring zero impact on the main UI lag.
 * It monitors the time and signals the frontend whenever a greeting category changes.
 */

const GREETING_UPDATE = "GREETING_UPDATE";

// 1. Same logic as dateFormatter for consistency
const getGreetingCategory = () => {
  const hour = new Date().getHours();
  if (hour < 5) return "Good Night";
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  if (hour < 21) return "Good Evening";
  return "Good Night";
};

// 2. Broadcast greeting to all open windows/clients
const broadcastGreeting = async () => {
  const currentGreeting = getGreetingCategory();
  const clients = await self.clients.matchAll();
  
  clients.forEach((client) => {
    client.postMessage({
      type: GREETING_UPDATE,
      greeting: currentGreeting,
    });
  });
};

// 3. Background signal interval
// Checks every 30 seconds to ensure high accuracy without UI thread impact.
setInterval(broadcastGreeting, 30000);

// 4. Handle worker installation and activation
self.addEventListener("install", (event) => {
  console.log("PWA: Active Greeting Worker - Installing");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("PWA: Active Greeting Worker - Activated");
  event.waitUntil(self.clients.claim());
});

// 5. Initial broadcast on start
self.addEventListener("sync", broadcastGreeting);
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "CHECK_GREETING") {
    broadcastGreeting();
  }
});
