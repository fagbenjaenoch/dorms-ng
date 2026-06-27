import Link from "next/link";
import BrandIcon from "./ui/BrandIcon";
import { Button } from "./ui/button";
import { navLinks } from "@/lib/utils";

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

        <div className="flex items-center gap-2">
          <Button variant="link" className="text-base">
            <Link href="/auth/signin">Sign In</Link>
          </Button>
          <Button className="text-base py-2.5 h-auto px-6" size="lg">
            <Link href="/auth/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
