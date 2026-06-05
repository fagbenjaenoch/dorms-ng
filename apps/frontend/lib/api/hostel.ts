import { APIResponse, Hostel } from "../dto";
import { CreateHostelListingData } from "../forms";
import { idParam, typeParam, UploadFile } from "../utils";
import { uploadPhoto } from "./upload";

export async function createHostelListing(
  data: CreateHostelListingData,
  primaryPhoto: UploadFile | null,
) {
  if (!primaryPhoto) {
    throw new Error("Primary photo is required");
  }

  const publicUrl = await uploadPhoto({
    entityName: data.name,
    entityType: "hostel",
    primaryPhoto: primaryPhoto.file,
  });

  const dataWithPrimaryPhoto = {
    ...data,
    primary_photo_url: publicUrl,
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/hostels`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataWithPrimaryPhoto),
  });

  const response = await res.json();
  if (!response.success) {
    throw new Error(response.message);
  }

  return response as any as APIResponse<CreateHostelListingData>;
}

export async function fetchHostel(
  slug: string,
): Promise<APIResponse<Hostel> | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/hostels/${slug}`,
    );

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error("Failed to fetch hostel");
    }

    return response.json() as any as APIResponse<Hostel>;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchHostelsByArea(
  areaType: string,
  areaId: string,
): Promise<APIResponse<Hostel[]>> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/hostels/search?${typeParam}=${areaType}&${idParam}=${areaId}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch hostels by type");
    }

    return response.json() as any as APIResponse<Hostel[]>;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch hostels by type");
  }
}
