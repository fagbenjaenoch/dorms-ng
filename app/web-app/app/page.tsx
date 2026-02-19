"use client";

import { FaSearch } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 text-gray-900 font-sans">
      <div className="flex justify-between px-8 py-8 bg-amber-400">
        <div className="flex gap-4">
          <span>🏠 Logo name</span>
          <a href="#">Hostels near me</a>
        </div>
        <div>Sign In</div>
      </div>
      <main className="flex flex-col items-center gap-10 py-32">
        <h1 className="text-5xl font-extrabold text-center">
          Find Hostels <br />
          on any university campus in Nigeria 🏳️
        </h1>
        <div className="text-xl">
          <FaSearch /> Start searching
        </div>
      </main>
    </div>
  );
}
