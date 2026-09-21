"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Heart,
  Lightbulb,
  LucideIcon,
  MapPin,
  Phone,
  Share2,
  ShieldAlert,
  ShieldUserIcon,
  Wifi,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { parseAsBoolean, useQueryState } from "nuqs";
import posthog from "posthog-js";
import { useEffect, useMemo } from "react";
import { useState } from "react";
import { BiMaleFemale } from "react-icons/bi";
import { BsHeartFill } from "react-icons/bs";
import { FaChair, FaFemale, FaMale, FaWhatsapp } from "react-icons/fa";
import { FaFaucetDrip } from "react-icons/fa6";
import { IconType } from "react-icons/lib";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { fetchHostel } from "@/lib/api/hostel";
import useMoneyFormat from "@/lib/hooks/useMoneyFormat";
import { useSaveHostel } from "@/lib/hooks/useSaveHostel";
import { useShare } from "@/lib/hooks/useShare";
import { Amenity, HostelTypeItems } from "@/lib/types";
import { fromSearchPageParam, generateWhatsappURL } from "@/lib/utils";

import BackToSearchPageButton from "../BackToSearchPage";
import ImageCarousel from "../ImageCarousel";

const AmenityToIcon: Record<Amenity, IconType | LucideIcon> = {
  light: Lightbulb,
  water: FaFaucetDrip,
  "common room": FaChair,
  wifi: Wifi,
};

const OccupancyTypeToIcon: Record<string, IconType | LucideIcon> = {
  male: FaMale,
  female: FaFemale,
  mixed: BiMaleFemale,
};

export default function HostelDetailsClient() {
  const [fromSearchPage, _] = useQueryState(fromSearchPageParam, parseAsBoolean);
  const { share } = useShare();

  const { savedHostels, saveHostel, removeHostel } = useSaveHostel();

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
  const [isSaved, setIsSaved] = useState(isHostelSaved);

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

  const handleShareHostel = () => {
    if (share) {
      const rawURL = new URL(window.location.href);
      const cleanURL = rawURL.origin + rawURL.pathname;

      share({
        title: hostel.name,
        text: `Check out this hostel`,
        url: cleanURL,
      });
    }
  };
  const photoUrls = hostel.photo_urls;
  const photoUrlObjects = useMemo(() => {
    return photoUrls.map((url, index) => ({
      url: process.env.NEXT_PUBLIC_R2_URL + url,
      alt: `${hostel.name} - ${index + 1}`,
    }));
  }, [photoUrls, hostel.name]);

  const ngnFormatter = useMoneyFormat();
  const formattedPrice = ngnFormatter.format(hostel.estimatedPriceRange);

  useEffect(() => {
    posthog.capture("hostel_details_viewed", {
      hostel_slug: slug,
      hostel_name: hostel.name,
      hostel_price: formattedPrice,
      is_verified: hostel.is_verified,
    });
  }, [slug, hostel.name, formattedPrice, hostel.is_verified]);

  const OccupantTypeIcon = hostel.occupancy_type.length
    ? OccupancyTypeToIcon[hostel.occupancy_type]
    : BiMaleFemale;

  return (
    <main className="max-w-7xl mx-auto py-10 sm:py-20 px-4 min-h-screen sm:px-6 lg:px-8">
      <div className="mb-4">{fromSearchPage && <BackToSearchPageButton />}</div>
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tighter flex items-center gap-3">
            {hostel.name}
          </h1>
          <div className="inline-flex gap-2 items-center mt-2 divide-x divide-gray-300">
            <p className="text-sm lg:text-base flex items-center gap-1 font-medium text-muted-foreground pr-2 min-w-32">
              <MapPin className="text-primary shrink-0 hidden lg:inline-flex" size={13} />
              {hostel.address}
            </p>
            <div className="text-sm lg:text-base flex items-center gap-1 font-medium text-muted-foreground">
              <OccupantTypeIcon size={14} className="text-primary" />
              <p className="capitalize">
                {hostel.occupancy_type.length > 0
                  ? HostelTypeItems.find(item => item.value === hostel.occupancy_type)
                      ?.label
                  : "N/A"}
              </p>
            </div>
          </div>
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
              <Image
                src="/gmap-26.webp"
                alt="Google Maps"
                width={16}
                height={16}
                loading="lazy"
              />
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="flex items-center gap-2 font-bold hover:text-primary transition-colors"
            onClick={() => {
              handleShareHostel();
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
            key={hostel._id}
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
          <section>
            <p className="prose prose-lg font-body">{hostel.description}</p>
          </section>

          <hr className="border-t border-outline-variant/20" />
          <section>
            <h2 className="text-xl md:text-3xl font-bold text-on-surface mb-6">
              What you'll get
            </h2>
            <ul className="list-style-none space-y-4 text-gray-700">
              {hostel.amenities.map(a => {
                const Icon = AmenityToIcon[a];
                return (
                  <li key={a} className="capitalize flex gap-2">
                    <Icon size={20} /> {a}
                  </li>
                );
              })}
            </ul>
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
            <div>
              <p className="text-sm font-bold uppercase tracking-widest mb-2">Contact</p>
              <div className="space-x-2 mb-8">
                <Button
                  size="icon-lg"
                  onClick={() => {
                    window.open(
                      generateWhatsappURL(
                        hostel.host_phone,
                        `Hello, I'm a student interested in booking a room at ${hostel.name} for next semester. Could you kindly let me know:

                        - Available rooms?
                        - Pricing and payment schedule?
                        - Any additional fees?
                        - Application process?

                        I look forward to your response. Thanks.`,
                      ),
                      "_blank",
                    );
                    posthog.capture("hostel_host_phone_clicked", {
                      hostel_slug: slug,
                      hostel_name: hostel.name,
                    });
                  }}
                >
                  <FaWhatsapp size={20} />
                </Button>
                <Button
                  size="icon-lg"
                  onClick={() => {
                    window.open(`tel:${hostel.host_phone}`, "_blank");
                    posthog.capture("hostel_host_phone_clicked", {
                      hostel_slug: slug,
                      hostel_name: hostel.name,
                    });
                  }}
                >
                  <Phone size={20} />
                </Button>
              </div>
            </div>
            {hostel.is_verified ? (
              <div className="bg-gray-200 rounded-xl p-4 flex items-start gap-4">
                <ShieldUserIcon size={20} className="text-primary shrink-0" />
                <div>
                  <p className="font-bold">Verified by Admin</p>
                  <p className="text-sm mt-1">
                    This property has been inspected and it's details can be trusted.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-gray-200 rounded-xl p-4 flex items-start gap-4">
                <ShieldAlert size={20} className="text-amber-500 shrink-0" />
                <div>
                  <p className="font-bold">Not fully verified by Admin</p>
                  <p className="text-sm mt-1">
                    This property has not been inspected so kindly confirm from the host
                    if it's details are still valid.
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
