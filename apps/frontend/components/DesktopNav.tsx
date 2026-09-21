import Link from "next/link";

import { navLinks } from "@/lib/utils";

import BrandIcon from "./ui/BrandIcon";
import { Button } from "./ui/button";

export default function DesktopNav() {
  return (
    <div className="bg-white">
      <div className="hidden lg:flex mx-auto max-w-7xl justify-between px-4 py-4 items-center">
        <Link href="/">
          <BrandIcon />
        </Link>
        <div className="flex gap-4">
          {navLinks.map(link => (
            <Button className="text-base" variant="link" key={link.title}>
              <Link href={link.href} className="href">
                {link.title}
              </Link>
            </Button>
          ))}
        </div>

        <div></div>
      </div>
    </div>
  );
}
