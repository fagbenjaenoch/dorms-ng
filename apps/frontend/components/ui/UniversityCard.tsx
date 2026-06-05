"use client";

import posthog from "posthog-js";
import Image from "next/image";
import Link from "next/link";
import { HTMLAttributes } from "react";

interface UniversityCardProps {
  name: string;
  imageUrl: string;
  slug: string;
}

export default function UniversityCard({
  name,
  imageUrl,
  slug,
  ...props
}: UniversityCardProps & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="relative rounded-3xl overflow-hidden group cursor-pointer"
      {...props}
    >
      <Link
        href={`/institutions/${slug}`}
        onClick={() => posthog.capture("university_card_clicked", { university_name: name, university_slug: slug })}
      >
        <Image
          src={imageUrl}
          alt={name}
          width={500}
          height={200}
          className="relative group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black opacity-70 to-transparent bottom-0"></div>
        <p className="absolute bottom-0 text-white text-xl font-bold p-4 leading-5">
          {name}
        </p>
      </Link>
    </div>
  );
}
