import HostelDetailsClient from "@/components/admin/HostelDetails/HostelDetailsClient";
import { HostelSkeleton } from "@/components/admin/HostelDetails/HostelDetailsSkeleton";
import { Suspense } from "react";

export default function HostelDetailsPage() {
    return (
        <Suspense fallback={<HostelSkeleton />}>
            <HostelDetailsClient />
        </Suspense>
    );
}
