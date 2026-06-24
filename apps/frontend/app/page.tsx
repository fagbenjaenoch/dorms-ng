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
          <div className="flex flex-col gap-6 lg:py-28">
            <div className="flex items-center gap-1 bg-primary-light text-primary px-2 py-1 text-xs font-semibold w-fit tracking-wider rounded-full uppercase">
              <GoVerified /> Verified Nigerian student housing
            </div>
            <h1 className="font-sans text-5xl lg:text-7xl tracking-tighter font-extrabold">
              Elevate your <span className="text-primary">campus</span> <br />
              Experience.
            </h1>
            <p className="text-foreground/70 lg:text-xl max-w-xl text-sm">
              The ultimate editorial collection of verified student housing across
              Nigeria. Discover premium hostels that match your academic ambition and
              lifestyle.
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
