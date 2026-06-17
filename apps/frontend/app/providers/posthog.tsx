"use client";
import React from "react";
import posthog from "posthog-js";
import { PostHogProvider } from "@posthog/react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function PHProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: "https://us.i.posthog.com",
      defaults: "2026-01-30",
    });
  }, []);

  if (isAdmin) {
    return <>{children}</>;
  }

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
