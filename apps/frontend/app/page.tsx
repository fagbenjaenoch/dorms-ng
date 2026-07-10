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
import Link from "next/link";
import { ShieldCheckIcon } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeader";

export default function Home() {
  return (
    <div className="bg-zinc-50 text-gray-900 overflow-hidden">
      <nav>
        <DesktopNav />
        <MobileNav />
      </nav>

      <section className="min-h-screen">
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
            <Link
              className="text-primary underline text-sm flex items-center gap-1"
              href="/"
            >
              <ShieldCheckIcon size={13} className="inline-block" /> See how verification
              works
            </Link>
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
      </section>
      <section className="bg-primary-light">
        <div className="container px-32 py-40">
          <p className="text-primary tracking-tighter text-xl lg:text-2xl font-bold text-center">
            Finding a hostel shouldn't feel like a gamble. Say goodbye to endless
            trekking, deceptive agents, non-existent properties, and the dreaded "what I
            ordered vs. what I got." We do the groundwork so you don't have to.
          </p>
        </div>
      </section>
      <PopularUniversities />
      <FeatureSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
