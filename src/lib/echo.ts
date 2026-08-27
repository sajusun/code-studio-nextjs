"use client";

import Echo from "laravel-echo";
import Pusher from "pusher-js";

let echoInstance: Echo<"reverb"> | null = null;

export function getEcho(): Echo<"reverb"> | null {
  if (typeof window === "undefined") return null;

  if (!echoInstance) {
    // Attach Pusher globally as required by laravel-echo
    (window as unknown as { Pusher: typeof Pusher }).Pusher = Pusher;

    echoInstance = new Echo({
      broadcaster: "reverb",
      key: process.env.NEXT_PUBLIC_REVERB_APP_KEY || "local-key",
      wsHost: process.env.NEXT_PUBLIC_REVERB_HOST || "127.0.0.1",
      wsPort: parseInt(process.env.NEXT_PUBLIC_REVERB_PORT || "8080", 10),
      wssPort: parseInt(process.env.NEXT_PUBLIC_REVERB_PORT || "8080", 10),
      forceTLS: process.env.NEXT_PUBLIC_REVERB_SCHEME === "https",
      enabledTransports: ["ws", "wss"],
    });
  }

  return echoInstance;
}
