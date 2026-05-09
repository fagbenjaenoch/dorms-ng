import DesktopNav from "@/components/DesktopNav";
import { HostelDetailsSkeleton } from "@/components/HostelDetails/HostelDetailsSkeleton";
import InstitutionDetailsClient from "@/components/InstitutionDetails/InstitutionDetailsClient";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/ui/Footer";
import { Suspense } from "react";

export default function InstitutionDetailsPage() {
  return (
    <div>
      <>
        <DesktopNav />
        <MobileNav />
      </>
      <div className="bg-gray-100">
        <Suspense fallback={<HostelDetailsSkeleton />}>
          <InstitutionDetailsClient />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
