"use client";

import MobileNav from "@/app/components/MobileNav";
import DesktopNav from "@/app/components/DesktopNav";
import LandingSearch from "@/app/components/LandingSearch";
import FeatureSection from "./components/ui/FeatureSection";
import PopularUniversities from "./components/PopularUniversities";
import CtaSection from "./components/CtaSection";
import Footer from "./components/ui/Footer";
import { GoVerified } from "react-icons/go";

export default function Home() {
  return (
    <div className="bg-zinc-50 text-gray-900 overflow-hidden">
      <nav>
        <DesktopNav />
        <MobileNav />
      </nav>

      <main className="min-h-screen">
        <div className="container">
          <div className="flex flex-col gap-6 py-28">
            <div className="flex items-center gap-1 bg-[#92febc] text-primary px-2 py-1 text-xs font-semibold w-fit tracking-wider rounded-full uppercase">
              <GoVerified /> Verified Nigerian student housing
            </div>
            <h1 className="font-sans text-5xl lg:text-7xl tracking-tighter font-extrabold">
              Elevate your <span className="text-primary">campus</span> <br />
              Experience.
            </h1>
            <p className="text-background/70 lg:text-xl max-w-xl">
              The ultimate editorial collection of verified student housing across
              Nigeria. Discover premium hostels that match your academic ambition and
              lifestyle.
            </p>
            <LandingSearch />
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
