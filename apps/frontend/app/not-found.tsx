"use client";

import DesktopNav from "@/components/DesktopNav";
import MobileNav from "@/components/MobileNav";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/Footer";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-surface text-on-surface flex flex-col min-h-screen">
      <nav>
        <DesktopNav />
        <MobileNav />
      </nav>
      <main className="grow flex flex-col items-center justify-center px-6 pt-24 pb-12">
        <div className="max-w-4xl w-full flex flex-col items-center text-center">
          <div className="relative mb-8">
            <h1 className="text-[12rem] md:text-[16rem] font-black text-primary leading-none select-none">
              404
            </h1>
          </div>
          <div className="space-y-6 max-w-2xl">
            <div className="space-y-2">
              <h2 className="text-4xl md:text-6xl font-extrabold text-primary tracking-tight">
                Page Not Found
              </h2>
              <p className="text-secondary text-xl font-semibold uppercase tracking-widest">
                We couldn't find that link
              </p>
            </div>
            <p className="text-on-surface-variant leading-relaxed">
              The page you're looking for might have been moved, deleted, or perhaps
              the address was entered incorrectly. Let's get you back on track.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link href="/">
                <Button variant="secondary" size="xl" className="cursor-pointer">
                  Return to homepage
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
