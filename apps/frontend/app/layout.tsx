import type { Metadata } from "next";
import { DM_Sans, Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "./QueryProvider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Suspense } from "react";
import { PostHogPageView, PostHogProvider } from "@posthog/next";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Hostel Marketplace App",
  description:
    "It acts as a trust layer for students trying to find hostels in an unfamiliar environment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`${inter.variable} ${dmSans.variable} antialiased selection:bg-primary selection:text-primary-foreground`}
      >
        <PostHogProvider clientOptions={{ api_host: "/ingest" }} bootstrapFlags>
          <PostHogPageView />
          <NuqsAdapter>
            <QueryProvider>
              <Suspense fallback={null}>
                {children}
                <Toaster />
              </Suspense>
            </QueryProvider>
          </NuqsAdapter>
        </PostHogProvider>
      </body>
    </html>
  );
}
