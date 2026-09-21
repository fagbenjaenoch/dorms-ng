"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useQueryStates } from "nuqs";
import { useEffect } from "react";

import { areaFilterParsers, hostelFilterParsers } from "@/lib/api/filter";
import { fetchHostelsByArea } from "@/lib/api/hostel";
import { paginationSerializerObject } from "@/lib/api/pagination";
import { APIResponse, Hostel } from "@/lib/dto";

import PropertyCard from "./ui/PropertyCard";

interface HostelResultProps {
  areaName: string;
  showInsight?: boolean;
}

export default function HostelResults({ areaName, showInsight }: HostelResultProps) {
  const [paginationFilters, _setPaginationFilters] = useQueryStates(
    paginationSerializerObject,
    {
      history: "push",
    },
  );
  const [hostelFilters, _setHostelFilters] = useQueryStates(hostelFilterParsers, {
    history: "push",
  });
  const [areaFilters, _setAreaFilters] = useQueryStates(areaFilterParsers, {
    history: "push",
  });
  const hostelQuery = useSuspenseQuery<APIResponse<Hostel[]>>({
    queryKey: ["hostels", areaFilters.areaId],
    queryFn: () => fetchHostelsByArea({ areaFilters, hostelFilters, paginationFilters }),
  });

  const hostels = hostelQuery.data?.payload;

  useEffect(() => {
    hostelQuery.refetch();
  }, [hostelFilters, paginationFilters, hostelQuery]);

  return (
    <div>
      {hostels && hostels?.length ? (
        <>
          {showInsight && (
            <p className="mt-3 text-sm text-muted-foreground mb-15">
              Showing {hostelQuery.data?.payload.length} result
              {hostelQuery.data?.payload.length > 1 ? "s" : ""} matching your criteria
              within <b>{areaName}</b>
            </p>
          )}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {hostels.map(
              (
                {
                  name,
                  address,
                  estimatedPriceRange,
                  photo_urls,
                  slug,
                  is_verified: isVerified,
                  amenities,
                },
                i,
              ) => (
                <PropertyCard
                  key={i}
                  name={name}
                  location={address}
                  price={estimatedPriceRange}
                  imageUrl={photo_urls[0]}
                  slug={slug}
                  isVerified={isVerified}
                  amenities={amenities}
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
