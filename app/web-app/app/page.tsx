"use client";

import MobileNav from "@/app/components/MobileNav";
import DesktopNav from "@/app/components/DesktopNav";
import LandingSearch from "@/app/components/LandingSearch";

export default function Home() {
  return (
    <div className="bg-zinc-50 text-gray-900 font-sans">
      <nav>
        <DesktopNav />
        <MobileNav />
      </nav>

      <main className="relative min-h-screen  flex flex-col items-center gap-10 py-32 px-8">
        <h1 className="text-5xl font-extrabold text-center">
          Find <span className="underline">hostels</span> on any <br />
          university campus in Nigeria
        </h1>
        <LandingSearch />
        <div className="w-[50%] h-[50%] z-0 absolute bottom-0 left-0 bg-linear-to-t from-[rgba(0,101,235,0.5)]"></div>
        <div className="w-[50%] h-[50%] z-0 absolute bottom-0 right-0 bg-linear-to-t from-[rgba(43,178,76,0.5)]"></div>
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
