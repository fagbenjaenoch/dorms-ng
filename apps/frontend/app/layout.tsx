import type { Metadata } from "next";
import { DM_Sans, Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import QueryProvider from "./QueryProvider";
import { NuqsAdapter } from "nuqs/adapters/next/app";

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
      <body
        className={`${inter.variable} ${dmSans.variable} antialiased selection:bg-primary selection:text-primary-foreground`}
      >
        <QueryProvider>
          <NuqsAdapter>
            {children}
            <Toaster />
          </NuqsAdapter>
        </QueryProvider>
      </body>
    </html>
  );
}
