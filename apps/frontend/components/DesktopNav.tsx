import Link from "next/link";
import BrandIcon from "./ui/BrandIcon";
import { Button } from "./ui/button";

export default function DesktopNav() {
  return (
    <div className="hidden lg:flex mx-auto max-w-7xl justify-between px-4 py-4 items-center">
      <Link href="/">
        <BrandIcon />
      </Link>
      <div className="flex gap-4">
        <Button className="text-base" variant="link">
          <a href="#" className="href">
            Find Hostels
          </a>
        </Button>
        <Button className="text-base" variant="link">
          <a href="#" className="href">
            How it works
          </a>
        </Button>
        <Button className="text-base" variant="link">
          <a href="#" className="href">
            Support
          </a>
        </Button>
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
