"use client";

import posthog from "posthog-js";
import { BusIcon, Compass, GraduationCap, MapIcon } from "lucide-react";
import { Button } from "../ui/button";
import { MdTune } from "react-icons/md";
import { FaPersonWalking } from "react-icons/fa6";
import { PiMapPinArea } from "react-icons/pi";
import { useSuspenseQuery } from "@tanstack/react-query";
import { notFound, useParams } from "next/navigation";
import { fetchInstitution } from "@/lib/api/institution";
import { scrollTo } from "@/lib/utils";
import { Suspense, useEffect } from "react";
import QueryErrorBoundary from "../error/QueryErrorBoundary";
import HostelResults from "../HostelResults";
import HostelResultsError from "../HostelResultsError";
import PropertyCardSkeleton from "../ui/PropertyCardSkeleton";
import Image from "next/image";
import { areaFilterParsers } from "@/lib/api/filter";
import { useQueryStates } from "nuqs";

export default function InstitutionDetailsClient() {
  let { slug } = useParams();
  slug = slug as string;

  const [areaFilters, setAreaFilters] = useQueryStates(areaFilterParsers, {});

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
    <main className="pt-20">
      <section className="relative px-8 py-12 pb-32 max-w-7xl mx-auto overflow-hidden">
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
              <h2 className="text-4xl font-extrabold tracking-tight mb-2">
                Hostels near <span className="text-primary">{institution?.acronym}</span>
              </h2>
              <p className="font-medium text-lg text-muted-foreground">
                Verified student housing within 2km of the campus gate.
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                className="p-3 rounded-xl shadow-sm bg-white text-black hover:bg-gray-100 transition-colors"
              >
                <MdTune size={25} />
              </Button>
              <select className="border-none rounded-xl font-bold px-6 py-3 shadow-sm focus:ring-primary bg-white">
                <option>Price: Low to High</option>
                <option>Closest to Gate</option>
                <option>Highest Rated</option>
              </select>
            </div>
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
      <section className="py-24 px-8 max-w-7xl mx-auto" id="map">
        <div className="rounded-[3rem] overflow-hidden shadow-xl border border-outline-variant/20">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-1 p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4 text-primary">
                <PiMapPinArea size={20} />
                <h2 className="text-3xl font-bold tracking-tight">Prime Location</h2>
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
                    <p className="text-xs text-muted-foreground">
                      Akoka &amp; Abule-Oja Gate Area
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-200">
                  <div className="bg-secondary p-2 py-3 rounded-xl">
                    <BusIcon size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold">15 Min Shuttle</h4>
                    <p className="text-xs text-muted-foreground">
                      Onike &amp; Iwaya Neighborhoods
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 relative min-h-[500px]">
              <div className="w-full h-full relative overflow-hidden">
                <Image
                  className="w-full h-full object-cover"
                  data-location="Lagos, Nigeria"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuxjCUrNAD1BiGxZOx6qtD7ADIW90zJnEUlLNMxYByrYcZqmfKvlI2NKCWKOgfyWp8aUcZvnOa_NLpUh3MDCKfx1oAJthRZIa9nn5KdZb4Uq1HPUbGvPgmDbChYeTzKmS-gN6cwN6n4rEtMcoQbik05B4WKgr4mOD1RnGHtw2F95xzPVvCaXwsB_HSppe9_LNfuqzS6zFDNcEfgz4vIEKN05-HuQNbWUaVwdB0YAPkNdUZKAAjdSsoDOVKenLNXl7pp59nLqkc6n5E"
                  alt="profile image"
                  width={100}
                  height={100}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="w-12 h-12 bg-primary rounded-full animate-ping absolute inset-0 opacity-20"></div>
                    <div className="relative w-12 h-12 bg-primary rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                      <span className="material-symbols-outlined text-white">school</span>
                    </div>
                  </div>
                </div>
                <div className="absolute top-[40%] left-[30%] w-8 h-8 bg-secondary rounded-full border-2 border-white flex items-center justify-center shadow-md hover:scale-125 transition-transform cursor-pointer">
                  <span className="material-symbols-outlined text-white text-[16px]">
                    home
                  </span>
                </div>
                <div className="absolute top-[60%] left-[45%] w-8 h-8 bg-secondary rounded-full border-2 border-white flex items-center justify-center shadow-md hover:scale-125 transition-transform cursor-pointer">
                  <span className="material-symbols-outlined text-white text-[16px]">
                    home
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
