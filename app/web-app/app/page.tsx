"use client";

import { FaSearch } from "react-icons/fa";
import MobileNav from "@/app/components/MobileNav";
import DesktopNav from "@/app/components/DesktopNav";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 text-gray-900 font-sans">
      <div>
        <DesktopNav />
        <MobileNav />
      </div>

      <main className="flex flex-col items-center gap-10 py-32 px-8">
        <h1 className="text-5xl font-extrabold text-center">
          Find <span className="underline">hostels</span> on any <br />
          university campus in Nigeria
        </h1>
        <div className="text-xl flex gap-4">
          <FaSearch /> Start searching
        </div>
      </main>
    </div>
  );
}
