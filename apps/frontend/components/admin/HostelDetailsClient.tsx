"use client";

import { APIResponse } from "@/lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";

interface Hostel {
  name: string;
  address: string;
  city: string;
  primary_photo_url: string;
}

export default function HostelDetailsClient() {
  let { id } = useParams();
  id = id as string;

  const { data: res } = useSuspenseQuery({
    queryKey: ["hostel", id],
    queryFn: async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/hostels/${id}`);

        if (!response.ok) {
          if (response.status === 404) return null;
          throw new Error("Failed to fetch hostel");
        }

        return response.json() as any as APIResponse<Hostel>;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  });

  if (!res || !res.success) {
    notFound();
  }

  const { payload: hostel } = res;

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold">{hostel.name}</h1>
      <p className="text-gray-500">{hostel.address}</p>

      {hostel.primary_photo_url && (
        <Image
          width={400}
          height={400}
          src={hostel.primary_photo_url}
          alt={hostel.name}
          className="w-full h-64 object-cover rounded-xl mt-4"
        />
      )}
    </main>
  );
}
