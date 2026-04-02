import Link from "next/link";
import BrandIcon from "./ui/BrandIcon";
import NavLink from "./ui/NavLink";
import { Button } from "./ui/button";

export default function DesktopNav() {
  return (
    <div className="hidden lg:flex mx-auto max-w-7xl justify-between px-4 py-4 items-center">
      <BrandIcon />
      <div className="flex gap-4">
        <NavLink href="#" label="Find Hostels" />
        <NavLink href="#" label="How it works" />
        <NavLink href="#" label="Support" />
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
  );
}
