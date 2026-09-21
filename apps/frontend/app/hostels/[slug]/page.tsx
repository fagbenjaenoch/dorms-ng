import { Suspense } from "react";

import DesktopNav from "@/components/DesktopNav";
import HostelDetailsClient from "@/components/HostelDetails/HostelDetailsClient";
import { HostelDetailsSkeleton } from "@/components/HostelDetails/HostelDetailsSkeleton";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/ui/Footer";

export default function HostelDetailsPage() {
  return (
    <div>
      <>
        <DesktopNav />
        <MobileNav />
      </>
      <div className="bg-gray-100">
        <Suspense fallback={<HostelDetailsSkeleton />}>
          <HostelDetailsClient />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
