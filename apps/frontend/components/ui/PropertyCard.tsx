"use client";

import posthog from "posthog-js";
import { Button } from "./button";
import { BiSolidBadgeCheck } from "react-icons/bi";
import { PiShieldCheckeredFill } from "react-icons/pi";
import { FaBolt } from "react-icons/fa6";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import useMoneyFormat from "@/lib/hooks/useMoneyFormat";
import { fromSearchPageParam } from "@/lib/utils";

interface PropertyCardProps {
  price: number;
  name: string;
  location: string;
  imageUrl: string;
  slug: string;
  isVerified: boolean;
}

export default function PropertyCard({
  price,
  name,
  location,
  imageUrl,
  slug,
  isVerified,
}: PropertyCardProps) {
  const formattedPrice = useMoneyFormat().format(price);

  return (
    <div className="group rounded-[2.5rem] overflow-hidden shadow-sm bg-white">
      <div className="relative h-64 overflow-hidden">
        <Image
          width={200}
          height={200}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          alt={name}
          src={imageUrl}
        />
        <div className="absolute top-4 left-4 bg-tertiary px-4 py-1 rounded-full font-bold text-xs tracking-widest shadow-lg uppercase">
          Self-Contain
        </div>
        {isVerified && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-xl text-primary flex items-center gap-1 shadow-md">
            <BiSolidBadgeCheck size={18} />
            <span className="text-xs font-bold">Verified</span>
          </div>
        )}
      </div>
      <div className="px-8 pb-8 pt-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="md:text-xl font-bold mb-1">{name}</h3>
            <p className="text-xs md:text-sm flex items-start gap-1 text-muted-foreground">
              <MapPin className="shrink-0" size={12} />
              <span className="leading-snug max-w-60 line-clamp-2">{location}</span>
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="md:text-2xl font-bold text-primary leading-none">
              {formattedPrice}
            </p>
            <p className="text-xs font-bold uppercase tracking-tighter">per session</p>
          </div>
        </div>
        <div className="flex gap-3 mb-6 text-muted-foreground">
          <span className="px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 bg-gray-200">
            <FaBolt />
            Prepaid Meter
          </span>
          <span className="px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 bg-gray-200">
            <PiShieldCheckeredFill size={13} />
            24/7 Security
          </span>
        </div>
        <Link
          href={`/hostels/${slug}?${fromSearchPageParam}=true`}
          onClick={() =>
            posthog.capture("hostel_card_clicked", {
              hostel_slug: slug,
              hostel_name: name,
              hostel_price: price,
              is_verified: isVerified,
            })
          }
        >
          <Button
            variant="ghost"
            size="xl"
            className="w-full py-4 rounded-2xl font-bold bg-primary/10"
          >
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
}
