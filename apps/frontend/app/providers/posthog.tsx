"use client";
import React from "react";
import posthog from "posthog-js";
import { PostHogProvider } from "@posthog/react";
import { useEffect } from "react";

export function PHProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: "https://us.i.posthog.com",
      defaults: "2026-01-30",
    });
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
