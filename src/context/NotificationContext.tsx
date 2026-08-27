"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getEcho } from "@/lib/echo";
import { ReverbNotificationPayload } from "@/types";

interface NotificationContextType {
  notifications: ReverbNotificationPayload[];
  latestNotification: ReverbNotificationPayload | null;
  unreadCount: number;
  clearNotifications: () => void;
  dismissToast: () => void;
}

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  latestNotification: null,
  unreadCount: 0,
  clearNotifications: () => {},
  dismissToast: () => {},
});

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<ReverbNotificationPayload[]>([]);
  const [latestNotification, setLatestNotification] = useState<ReverbNotificationPayload | null>(null);
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    const echo = getEcho();
    if (!echo) return;

    // Listen on public notifications channel
    const channel = echo.channel("notifications");
    channel.listen(".NotificationSent", (event: { notification?: ReverbNotificationPayload; title?: string; body?: string }) => {
      const payload: ReverbNotificationPayload = {
        title: event.notification?.title || event.title || "New Product Drop / Update",
        body: event.notification?.body || event.body || "A new software release is now available!",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: event.notification?.type || "general",
      };

      setNotifications((prev) => [payload, ...prev]);
      setLatestNotification(payload);
      setToastVisible(true);

      // Auto dismiss toast after 6 seconds
      setTimeout(() => {
        setToastVisible(false);
      }, 6000);
    });

    // Also listen on test-channel for live connection tests
    const testChannel = echo.channel("test-channel");
    testChannel.listen(".test-event", (event: { message?: string }) => {
      const payload: ReverbNotificationPayload = {
        title: "📡 Live Broadcast Event",
        body: event.message || "Reverb WebSocket broadcast received successfully!",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "system",
      };
      setNotifications((prev) => [payload, ...prev]);
      setLatestNotification(payload);
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 5000);
    });

    return () => {
      echo.leaveChannel("notifications");
      echo.leaveChannel("test-channel");
    };
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        latestNotification: toastVisible ? latestNotification : null,
        unreadCount: notifications.length,
        clearNotifications: () => setNotifications([]),
        dismissToast: () => setToastVisible(false),
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => useContext(NotificationContext);
