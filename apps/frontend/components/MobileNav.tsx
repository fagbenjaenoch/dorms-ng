"use client";

import { RxHamburgerMenu } from "react-icons/rx";
import BrandIcon from "@/components/ui/BrandIcon";
import { useState } from "react";
import { FaX } from "react-icons/fa6";
import Link from "next/link";
import { navLinks } from "@/lib/utils";
import { Button } from "./ui/button";

export default function MobileNav() {
  const [navActive, setNavActive] = useState(false);

  const toggleNav = () => {
    setNavActive((prev) => !prev);
  };
  return (
    <div className="flex lg:hidden p-4 lg:p-8 justify-between">
      <Link href="/">
        <BrandIcon />
      </Link>
      <RxHamburgerMenu size={20} className="cursor-pointer" onClick={toggleNav} />

      {navActive && (
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-8 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between w-full">
            <Link href="/">
              <BrandIcon />
            </Link>
            <FaX className="cursor-pointer" onClick={toggleNav} />
          </div>

          <div className="mt-20 flex flex-col gap-y-8">
            {navLinks.map((link) => (
              <Button className="text-base" variant="link" key={link.title}>
                <Link href={link.href} className="href">
                  {link.title}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
