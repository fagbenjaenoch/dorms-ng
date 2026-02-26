"use client";

import MobileNav from "@/app/components/MobileNav";
import DesktopNav from "@/app/components/DesktopNav";
import LandingSearch from "@/app/components/LandingSearch";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-zinc-50 text-gray-900 font-sans">
      <nav>
        <DesktopNav />
        <MobileNav />
      </nav>

      <main className="relative min-h-screen">
        {/* Teal Glow Background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
                           radial-gradient(125% 125% at 50% 10%, #ffffff 40%, #14b8a6 100%)
                         `,
            backgroundSize: "100% 100%",
          }}
        />
        <div className="relative flex flex-col items-center gap-10 py-32 px-8">
          <h1 className="text-5xl font-extrabold text-center">
            Find <span className="underline">hostels</span> on any <br />
            university campus in Nigeria{" "}
            <Image
              src="/nigerian-flag.webp"
              width={40}
              height={30}
              alt="Nigerian Flag"
              className="inline-block"
            />
          </h1>
          <LandingSearch />
        </div>
      </main>
      <section>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, quis
        incidunt? Facilis iusto dignissimos libero debitis vero ullam ipsum maxime
        quo blanditiis. Exercitationem adipisci eos aliquam voluptates ea rem sit vel
        quidem dolorem, id, deleniti soluta delectus, labore rerum sed illum
        temporibus harum ullam quae eum neque tempora quia eius.
      </section>
    </div>
  );
}
