import HostelDetailsClient from "@/components/admin/HostelDetails/HostelDetailsClient";
import { HostelSkeleton } from "@/components/admin/HostelDetails/HostelDetailsSkeleton";
import DesktopNav from "@/components/DesktopNav";
import MobileNav from "@/components/MobileNav";
import { Suspense } from "react";

export default function HostelDetailsPage() {
  return (
    <div>
      <>
        <DesktopNav />
        <MobileNav />
      </>
      <div className="bg-gray-100">
        <Suspense fallback={<HostelSkeleton />}>
          <HostelDetailsClient />
        </Suspense>
      </div>
    </div>
  );
}
