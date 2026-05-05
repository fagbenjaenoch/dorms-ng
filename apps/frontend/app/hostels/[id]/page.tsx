import { APIResponse } from "@/lib/api";
import { notFound } from "next/navigation";

interface Hostel {
  name: string;
  address: string;
  city: string;
  primary_photo_url: string;
}

async function getHostel(id: string) {
  const res = await fetch(`http://localhost:8000/api/v1/hostels/${id}`, {
    next: {
      revalidate: 3600,
    },
  });

  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error("Failed to fetch hostel");
  }

  return res.json() as any as APIResponse<Hostel>;
}

export default async function HostelDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await getHostel(id);

  if (!res?.success) {
    notFound();
  }

  const { payload: hostel } = res;

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold">{hostel.name}</h1>
      <p className="text-gray-500">{hostel.address}</p>

      {hostel.primary_photo_url && (
        <img
          src={hostel.primary_photo_url}
          alt={hostel.name}
          className="w-full h-64 object-cover rounded-xl mt-4"
        />
      )}
    </main>
  );
}
