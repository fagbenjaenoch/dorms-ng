"use client";

import { AreaTypeEnum, fromSearchPageParam } from "@/lib/utils";
import PropertyCard from "./ui/PropertyCard";
import { fetchHostelsByArea } from "@/lib/api/hostel";
import { APIResponse, Hostel } from "@/lib/dto";
import { useSuspenseQuery } from "@tanstack/react-query";

interface HostelResultProps {
  areaType: AreaTypeEnum;
  areaId: string;
  areaName: string;
  showInsight?: boolean;
}

export default function HostelResults({
  areaType,
  areaId,
  areaName,
  showInsight,
}: HostelResultProps) {
  const hostelQuery = useSuspenseQuery<APIResponse<Hostel[]>>({
    queryKey: ["hostels", areaId],
    queryFn: () => fetchHostelsByArea(areaType, areaId),
  });

  const hostels = hostelQuery.data?.payload;

  return (
    <div>
      {hostels && hostels?.length ? (
        <>
          {showInsight && (
            <p className="mt-3 text-sm text-muted-foreground mb-15">
              Showing {hostelQuery.data?.payload.length} result
              {hostelQuery.data?.payload.length !== 1 ? "s" : ""} matching your
              criteria within <b>{areaName}</b>
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hostels.map(
              (
                { name, address, estimatedPriceRange, photo_urls, slug, isVerified },
                i,
              ) => (
                <PropertyCard
                  key={i}
                  name={name}
                  location={address}
                  price={estimatedPriceRange}
                  imageUrl={photo_urls.split(", ")?.[0]}
                  slug={slug}
                  isVerified={isVerified}
                />
              ),
            )}
          </div>
        </>
      ) : (
        <div className="mt-20 text-center">No results found</div>
      )}
    </div>
  );
}
