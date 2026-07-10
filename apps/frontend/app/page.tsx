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
import { SearchIcon, ShieldCheckIcon } from "lucide-react";
import { RoughNotation } from "react-rough-notation";
import SectionHeading from "@/components/ui/SectionHeader";
import FeatureCard from "@/components/ui/FeatureCard";
import { MdTune } from "react-icons/md";

export default function Home() {
  return (
    <div className="bg-zinc-50 text-gray-900 overflow-hidden">
      <nav>
        <DesktopNav />
        <MobileNav />
      </nav>

      <section className="min-h-screen">
        <div className="container flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          <div className="flex flex-col gap-6 lg:pb-28 lg:pt-10 max-w-prose">
            <div className="flex items-center gap-1 bg-primary-light text-primary px-2 py-1 text-xs font-semibold w-fit tracking-wider rounded-full uppercase">
              <GoVerified /> Verified Nigerian student housing
            </div>
            <h1 className="font-sans text-5xl lg:text-6xl tracking-tighter font-extrabold">
              Discover campus hostels you can actually{" "}
              <span className="text-primary">
                <RoughNotation type="underline" color="#006a3d" padding={-5} show animate>
                  trust .
                </RoughNotation>
              </span>
            </h1>
            <p className="text-muted-foreground max-w-xl">
              Stop guessing. Search hundreds of hostels near your institution with zero
              stress. If it's on Dorms.ng with a Verified badge, we've physically
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
              className="w-100 hidden md:block"
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
      <section>
        <div className="container pb-20">
          <SectionHeading
            label="Find Exactly What You Need, Fast."
            description="The Experience"
          />
          <p className="mb-8">
            Enter your institution and instantly unlock the best off-campus housing around
            you. Whether you need a private self-con, a shared room, or proximity to the
            school gate, our smart filters let you discover the perfect space that fits
            your budget and lifestyle.
          </p>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8 lg:gap-4">
            <FeatureCard
              title="Campus-Centric Search"
              description="Tailored exclusively for institutions across Nigeria."
              Icon={<SearchIcon className="shrink-0" size={20} />}
              className="bg-muted-foreground/10"
            />

            <FeatureCard
              title="Smart Filters"
              description="Sort by price, distance to campus, and amenities (water, power, security)."
              Icon={<MdTune className="shrink-0" size={20} />}
              className="bg-muted-foreground/10"
              // iconBg="bg-sky-300/50"
            />
          </div>
        </div>
      </section>
      <FeatureSection />
      <section>
        <div className="container pb-20">
          <SectionHeading label="How it works" description="" />

          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8 lg:gap-4">
            <FeatureCard
              title="Search Your School."
              description="Enter your institution to discover available hostels in the surrounding area."
              Icon={<span className="font-extrabold">1</span>}
              className="bg-muted-foreground/10"
            />

            <FeatureCard
              title="Look for the Badge."
              description="Filter for 'Verified' properties to guarantee safety, accuracy, and peace of mind."
              Icon={<span className="font-extrabold">2</span>}
              className="bg-muted-foreground/10"
              // iconBg="bg-sky-300/50"
            />

            <FeatureCard
              title="Secure Your Space."
              description="Connect with vetted caretakers and book your new home with confidence."
              Icon={<span className="font-extrabold">3</span>}
              className="bg-muted-foreground/10"
              // iconBg="bg-sky-300/50"
            />
          </div>
        </div>
      </section>
      <PopularUniversities />
      <CtaSection />
      <Footer />
    </div>
  );
}
