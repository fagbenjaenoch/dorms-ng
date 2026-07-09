"use client";

import MobileNav from "@/components/MobileNav";
import DesktopNav from "@/components/DesktopNav";
import LandingSearch from "@/components/LandingSearch";
import FeatureSection from "@/components/ui/FeatureSection";
import PopularUniversities from "@/components/PopularUniversities";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/ui/Footer";
import { GoVerified } from "react-icons/go";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-zinc-50 text-gray-900 overflow-hidden">
      <nav>
        <DesktopNav />
        <MobileNav />
      </nav>

      <main className="min-h-screen">
        <div className="container flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          <div className="flex flex-col gap-6 lg:pb-28 lg:pt-10">
            <div className="flex items-center gap-1 bg-primary-light text-primary px-2 py-1 text-xs font-semibold w-fit tracking-wider rounded-full uppercase">
              <GoVerified /> Verified Nigerian student housing
            </div>
            <h1 className="font-sans text-5xl lg:text-6xl tracking-tighter font-extrabold">
              Discover <span className="text-primary">campus</span> <br />
              hostels you can actually trust.
            </h1>
            <p className="text-muted-foreground max-w-xl">
              Stop guessing. Search hundreds of hostels near your institution with zero
              stress. If it’s on Dorms.ng with a Verified badge, we’ve physically
              inspected it. What you see is exactly what you get.
            </p>
            <LandingSearch />
          </div>
          <div className="lg:inline-block overflow-hidden rounded-2xl max-w-xl pointer-events-none">
            <Image
              src="/hero.webp"
              width={300}
              height={450}
              className="w-100"
              alt="Students hanging out"
              loading="lazy"
            />
          </div>
        </div>
      </main>
      <PopularUniversities />
      <FeatureSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
