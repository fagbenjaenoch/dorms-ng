"use client";

import posthog from "posthog-js";
import { Button } from "@/components/ui/button";
import { fetchHostel } from "@/lib/api/hostel";
import useMoneyFormat from "@/lib/hooks/useMoneyFormat";
import { useSuspenseQuery } from "@tanstack/react-query";
import { BadgeCheck, Clock4, Heart, MapPin, Share2, ShieldUserIcon } from "lucide-react";
import { useEffect, useMemo } from "react";
import { notFound, useParams } from "next/navigation";
import { useQueryState, parseAsBoolean } from "nuqs";
import { FaPersonWalking } from "react-icons/fa6";
import BackToSearchPageButton from "../BackToSearchPage";
import { fromSearchPageParam } from "@/lib/utils";
import { useShare } from "@/lib/hooks/useShare";
import { useSaveHostel } from "@/lib/hooks/useSaveHostel";
import { useState } from "react";
import { toast } from "sonner";

import ImageCarousel from "../ImageCarousel";
import Link from "next/link";
import Image from "next/image";
import { BsHeartFill } from "react-icons/bs";

export default function HostelDetailsClient() {
  const [fromSearchPage, _] = useQueryState(fromSearchPageParam, parseAsBoolean);
  const { share } = useShare();

  const { savedHostels, saveHostel, removeHostel } = useSaveHostel();
  const [isSaved, setIsSaved] = useState(false);

  let { slug } = useParams();
  slug = slug as string;

  const { data: res } = useSuspenseQuery({
    queryKey: ["hostel", slug],
    queryFn: () => fetchHostel(slug),
  });

  if (!res || !res.success) {
    notFound();
  }

  const { payload: hostel } = res;
  const isHostelSaved =
    savedHostels.find(hostel => hostel._id === hostel._id) !== undefined;

  const handleSaveHostel = () => {
    if (isSaved) {
      removeHostel(hostel._id);
      toast.success("Hostel removed successfully");
    } else {
      saveHostel(hostel);
      toast.success("Hostel saved successfully");
    }
    setIsSaved(!isSaved);
  };

  const photoUrls = hostel.photo_urls.split(", ");
  const photoUrlObjects = useMemo(() => {
    return photoUrls.map((url, index) => ({
      url: process.env.NEXT_PUBLIC_R2_URL + url,
      alt: `${hostel.name} - ${index + 1}`,
    }));
  }, [photoUrls, hostel.name]);

  const ngnFormatter = useMoneyFormat();
  const formattedPrice = ngnFormatter.format(hostel.estimatedPriceRange);

  useEffect(() => {
    setIsSaved(isHostelSaved);
  }, [isHostelSaved]);

  useEffect(() => {
    posthog.capture("hostel_details_viewed", {
      hostel_slug: slug,
      hostel_name: hostel.name,
      hostel_price: formattedPrice,
      is_verified: hostel.isVerified,
    });
  }, [slug, hostel.name, formattedPrice, hostel.isVerified]);

  return (
    <main className="max-w-7xl mx-auto py-10 sm:py-20 px-4 min-h-screen sm:px-6 lg:px-8">
      <div className="mb-4">{fromSearchPage && <BackToSearchPageButton />}</div>
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-on-surface flex items-center gap-3">
            {hostel.name}
            {hostel.isVerified && (
              <span className="inline-flex gap-1 items-center bg-primary-light text-primary text-sm font-bold px-3 py-1 rounded-full uppercase tracking-widest mt-2 md:mt-0">
                <BadgeCheck size={15} />
                Verified
              </span>
            )}
          </h1>
          <p className="text-sm lg:text-base flex items-center gap-1 mt-2 font-medium text-muted-foreground">
            <MapPin className="text-primary shrink-0 hidden lg:inline-flex" size={13} />
            {hostel.address}
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            href={`https://maps.google.com/?q=${encodeURIComponent(hostel.name)},${encodeURIComponent(hostel.address)}`}
            target="_blank"
          >
            <Button
              variant="neutral"
              className="bg-muted-foreground/20 hover:bg-muted-foreground/30"
            >
              View on Google maps
              <Image src="/gmap-26.webp" alt="Google Maps" width={16} height={16} />
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="flex items-center gap-2 font-bold hover:text-primary transition-colors"
            onClick={() => {
              if (share) {
                share({
                  title: hostel.name,
                  text: hostel.description,
                  url: window.location.href,
                });
              }
              posthog.capture("hostel_shared", {
                hostel_slug: slug,
                hostel_name: hostel.name,
              });
            }}
          >
            <Share2 />
            Share
          </Button>
          <Button
            variant="ghost"
            className="flex items-center gap-2 font-bold text-secondary hover:text-secondary transition-colors"
            onClick={() => {
              handleSaveHostel();
              posthog.capture("hostel_saved", {
                hostel_slug: slug,
                hostel_name: hostel.name,
              });
            }}
          >
            {isSaved ? <BsHeartFill /> : <Heart />}
            {isSaved ? "Saved" : "Save"}
          </Button>
        </div>
      </div>

      {photoUrls && (
        <div className="mb-6">
          <ImageCarousel photos={photoUrlObjects} />
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/3 space-y-12">
          <div className="bg-white rounded-2xl p-6 shadow-xs border border-gray-300 flex flex-wrap gap-8 text-sm lg:text-lg">
            <div className="flex items-center gap-4 ">
              <div className="bg-primary p-2 py-3 rounded-xl">
                <FaPersonWalking size={18} className="text-primary-light" />
              </div>
              <div>
                <p className="text-gray-600 font-bold uppercase">Distance to Campus</p>
                <p className="font-bold">0.8km to Main Gate</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-secondary p-2 py-3 rounded-xl">
                <Clock4 size={20} className="text-white" />
              </div>
              <div>
                <p className="text-gray-600 font-bold uppercase">Commute Time</p>
                <p className="font-bold">10 mins walk</p>
              </div>
            </div>
          </div>
          <section>
            <h2 className="text-xl md:text-3xl font-bold text-on-surface mb-6">
              About this <span className="text-primary">hostel</span>
            </h2>
            <div className="prose prose-lg font-body">{hostel.description}</div>
          </section>

          <hr className="border-t border-outline-variant/20" />
          <section>
            <h2 className="text-xl md:text-3xl font-bold text-on-surface mb-6">
              Location Overview
            </h2>
            <p>Coming soon</p>
          </section>
        </div>
        <div className="lg:w-1/3">
          <div className="rounded-[2rem] p-8 shadow-2xl border border-outline-variant/20">
            <div className="mb-8">
              <p className="text-sm font-bold uppercase tracking-widest mb-2">
                Estimated Price Range
              </p>
              <h3 className="text-2xl md:text-4xl font-extrabold tracking-tighter text-on-surface">
                {formattedPrice}
                <span className="text-lg font-medium tracking-normal">/ year</span>
              </h3>
            </div>
            <div className="space-y-4 mb-8">
              <Button
                size="xl"
                variant="secondary"
                className="w-full py-4 rounded-xl font-bold md:text-lg transition-colors border border-outline-variant/50"
                onClick={() =>
                  posthog.capture("hostel_contact_host_clicked", {
                    hostel_slug: slug,
                    hostel_name: hostel.name,
                  })
                }
              >
                Contact Host
              </Button>
            </div>
            {hostel.isVerified && (
              <div className="bg-gray-200 rounded-xl p-4 flex items-start gap-4">
                <ShieldUserIcon size={20} className="text-primary shrink-0" />
                <div>
                  <p className="font-bold">Verified by Admin</p>
                  <p className="text-sm mt-1">
                    This property has been physically inspected for safety and quality
                    standards.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
