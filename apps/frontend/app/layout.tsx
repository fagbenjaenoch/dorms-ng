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
  metadataBase: new URL("https://dorms.ng"),
  title: {
    default: "Dorms.ng - Nigeria's student hostel discovery and verification platform",
    template: "%s | Dorms.ng",
  },
  description:
    "Discover and verify over 10,000 student hostels in Nigeria's student hostel discovery and verification platform.",
  keywords: ["student hostel", "hostel discovery", "hostel verification", "Nigeria"],
  authors: [{ name: "Dorms.ng" }],
  creator: "Enoch Fagbenja",
  publisher: "Dorms.ng",
  formatDetection: {
    email: false,
    address: false,
    date: false,
  },
  openGraph: {
    type: "website",
    url: "https://dorms.ng",
    title: "Dorms.ng - Nigeria's student hostel discovery and verification platform",
    description:
      "Discover and verify over 10,000 student hostels in Nigeria's student hostel discovery and verification platform.",
    siteName: "Dorms.ng",
    images: [
      {
        url: "https://dorms.ng/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dorms.ng - Student hostel discovery and verification platform",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dorms.ng - Student hostel discovery and verification platform",
    description:
      "Discover and verify over 10,000 student hostels in Nigeria's student hostel discovery and verification platform.",
    images: ["https://dorms.ng/og-image.png"],
  },
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
        <PostHogProvider
          apiKey={process.env.NEXT_PUBLIC_POSTHOG_KEY!}
          clientOptions={{ api_host: "/ingest" }}
        >
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
