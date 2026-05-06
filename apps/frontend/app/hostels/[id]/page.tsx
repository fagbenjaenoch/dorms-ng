import HostelDetailsClient from "@/components/admin/HostelDetailsClient";
import { HostelSkeleton } from "@/components/admin/HostelDetailsSkeleton";
import { Suspense } from "react";

export default function HostelDetailsPage() {
  return (
    <Suspense fallback={<HostelSkeleton />}>
      <HostelDetailsClient />
    </Suspense>
  );
}
