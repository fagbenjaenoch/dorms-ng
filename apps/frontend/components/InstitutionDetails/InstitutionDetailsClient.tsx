"use client";

import posthog from "posthog-js";
import { BusIcon, Compass, GraduationCap, MapIcon, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { FaPersonWalking } from "react-icons/fa6";
import { PiMapPinArea } from "react-icons/pi";
import { useSuspenseQuery } from "@tanstack/react-query";
import { notFound, useParams } from "next/navigation";
import { fetchInstitution } from "@/lib/api/institution";
import { scrollTo } from "@/lib/utils";
import { Suspense, useEffect, useRef } from "react";
import QueryErrorBoundary from "../error/QueryErrorBoundary";
import HostelResults from "../HostelResults";
import HostelResultsError from "../HostelResultsError";
import PropertyCardSkeleton from "../ui/PropertyCardSkeleton";
import { areaFilterParsers, hostelFilterParsers } from "@/lib/api/filter";
import { useQueryStates } from "nuqs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Map, MapControls, MapMarker, MapRef, MarkerContent } from "../ui/map";

const items = [
  { label: "Sort by", value: null },
  { label: "Price: Low to High", value: "price-asc" as const },
  { label: "Price: High to Low", value: "price-desc" as const },
];

export default function InstitutionDetailsClient() {
  let { slug } = useParams();
  slug = slug as string;

  const mapRef = useRef<MapRef>(null);

  const [areaFilters, setAreaFilters] = useQueryStates(areaFilterParsers, {});
  const [hostelFilters, setHostelFilters] = useQueryStates(hostelFilterParsers, {
    history: "push",
  });
  const institutionQuery = useSuspenseQuery({
    queryKey: ["institution", slug],
    queryFn: () => fetchInstitution(slug),
  });

  useEffect(() => {
    if (!institutionQuery.data) return;

    setAreaFilters({
      areaId: institutionQuery.data?.payload.id,
      areaType: "institution",
    });
  }, [institutionQuery.data, setAreaFilters]);

  if (!institutionQuery.data) return notFound();

  const { payload: institution } = institutionQuery.data;

  const renderLoadingSkeleton = () =>
    Array.from({ length: 5 }).map((_, i) => <PropertyCardSkeleton key={i} />);

  return (
    <main>
      <section className="relative container py-24 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 z-10">
            <div className="inline-flex items-center uppercase gap-2 px-2 lg:px-3 py-1 bg-tertiary text-amber-800 rounded-full text-xs font-black tracking-widest mb-6">
              <GraduationCap size={14} />
              Top Tier Institution
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tighter leading-none mb-4">
              {institution?.name}
            </h1>
            <p className="text-xl lg:text-2xl font-bold text-muted-foreground mb-8 tracking-tight">
              {institution?.acronym} • {institution?.city}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
              <div className="bg-muted-foreground/10 p-4 lg:p-6 rounded-[2rem] transition-colors duration-300">
                <p className="text-3xl font-bold text-primary">124+</p>
                <p className="text-sm font-medium">Affiliated Hostels</p>
              </div>
              <div className="bg-muted-foreground/10 p-4 lg:p-6 rounded-[2rem] transition-colors duration-300">
                <p className="text-3xl font-bold text-secondary">55k+</p>
                <p className="text-sm font-medium">Student Population</p>
              </div>
              <div className="bg-muted-foreground/10 p-4 lg:p-6 rounded-[2rem] transition-colors duration-300">
                <p className="text-3xl font-bold">4.8</p>
                <p className="text-sm font-medium">Safety Rating</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button
                variant="default"
                size="xl"
                className="px-8 py-4 flex items-center gap-2 text-primary-light"
                onClick={() => {
                  scrollTo("#hostels");
                  posthog.capture("institution_explore_hostels_clicked", {
                    institution_name: institution.name,
                    institution_slug: slug,
                  });
                }}
              >
                <Compass />
                Explore Nearby Hostels
              </Button>
              <Button
                variant="ghost"
                size="xl"
                className="px-8 py-4 text-primary rounded-2xl font-bold flex items-center gap-2 shadow-sm border border-outline-variant/40 transition-colors duration-300"
                onClick={() => scrollTo("#map")}
              >
                <MapIcon /> View on Map
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="min-h-125 py-24 px-8 bg-gray-200/80" id="hostels">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-2xl lg:text-4xl font-extrabold tracking-tight mb-2">
                Hostels near <span className="text-primary">{institution?.acronym}</span>
              </h2>
              <p className="font-medium text-lg text-muted-foreground">
                Verified student housing within 2km of the campus gate.
              </p>
            </div>
            <Select items={items}>
              <SelectTrigger className="w-full bg-white max-w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {items.map(item => (
                    <SelectItem
                      key={item.value}
                      value={item.value}
                      onClick={() => setHostelFilters({ sortBy: item.value })}
                    >
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <QueryErrorBoundary errorFallback={HostelResultsError}>
            <Suspense
              fallback={
                <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {renderLoadingSkeleton()}
                </div>
              }
            >
              <HostelResults areaName={institution.name} />
            </Suspense>
          </QueryErrorBoundary>
        </div>
      </section>
      <section className="container py-24" id="map">
        <div className="rounded-[3rem] overflow-hidden shadow-xl border border-outline-variant/20">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-1 p-10 flex flex-col justify-center border border-b lg:border-b-0 lg:border-r">
              <div className="flex items-center gap-3 mb-4 text-primary">
                <PiMapPinArea size={20} />
                <h2 className="text-3xl font-bold tracking-tight">Location</h2>
              </div>
              <p className="mb-8 leading-relaxed">
                {institution.description.length > 0
                  ? institution.description
                  : "Institution Detail"}
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-200">
                  <div className="bg-primary p-2 py-3 rounded-xl">
                    <FaPersonWalking size={20} className="text-primary-light" />
                  </div>
                  <div>
                    <h4 className="font-bold">5-10 Min Walk</h4>
                    <p className="text-xs text-muted-foreground">University Gate Area</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-200">
                  <div className="bg-secondary p-2 py-3 rounded-xl">
                    <BusIcon size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold">15 Min Shuttle</h4>
                    <p className="text-xs text-muted-foreground">
                      Off-campus Neighborhoods
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 relative min-h-[500px]">
              <div className="w-full h-full relative overflow-hidden">
                <Map
                  ref={mapRef}
                  center={[institution.longitude, institution.latitude]}
                  zoom={12}
                  theme="light"
                >
                  <MapControls
                    position="top-right"
                    showLocate
                    showCompass
                    showFullscreen
                    showZoom
                  />
                  <MapMarker
                    longitude={institution.longitude}
                    latitude={institution.latitude}
                  >
                    <MarkerContent>
                      <MapPin
                        className="cursor-move fill-red-500 stroke-white"
                        size={28}
                      />
                    </MarkerContent>
                  </MapMarker>
                </Map>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
