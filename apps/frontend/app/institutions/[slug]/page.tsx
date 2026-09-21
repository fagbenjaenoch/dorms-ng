import { Suspense } from "react";

import DesktopNav from "@/components/DesktopNav";
import { InstitutionDetailsSkeleton } from "@/components/InstitutionDetails/InsititutionDetailsSkeleton";
import InstitutionDetailsClient from "@/components/InstitutionDetails/InstitutionDetailsClient";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/ui/Footer";

export default function InstitutionDetailsPage() {
  return (
    <div>
      <>
        <DesktopNav />
        <MobileNav />
      </>
      <div className="bg-gray-100">
        <Suspense fallback={<InstitutionDetailsSkeleton />}>
          <InstitutionDetailsClient />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
