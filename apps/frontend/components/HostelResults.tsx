"use client";

import { AreaTypeEnum } from "@/lib/utils";
import PropertyCard from "./ui/PropertyCard";
import { fetchHostelsByArea } from "@/lib/api/hostel";
import { APIResponse, Hostel } from "@/lib/dto";
import { useSuspenseQuery } from "@tanstack/react-query";

interface HostelResultProps {
  areaType: AreaTypeEnum;
  areaId: string;
}

export default function HostelResults({ areaType, areaId }: HostelResultProps) {
  const hostelQuery = useSuspenseQuery<APIResponse<Hostel[]>>({
    queryKey: ["hostels", areaId],
    queryFn: () => fetchHostelsByArea(areaType, areaId),
  });

  const hostels = hostelQuery.data?.payload;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {hostels?.length ? (
        hostels.map(
          ({ name, address, estimated_price_range, primary_photo_url, slug }, i) => (
            <PropertyCard
              key={i}
              name={name}
              location={address}
              price={estimated_price_range}
              imageUrl={primary_photo_url}
              slug={slug}
            />
          ),
        )
      ) : (
        <div>No results found</div>
      )}
    </div>
  );
}
