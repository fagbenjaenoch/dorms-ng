import { APIResponse, Hostel } from "../dto";
import { CreateHostelListingData } from "../forms";
import { UploadFile } from "../utils";
import {
  AreaOptions,
  areaSerializer,
  HostelFilterOptions,
  hostelFilterSerializer,
} from "./filter";
import { PaginationOptions, paginationSerializer } from "./pagination";
import { uploadPhoto } from "./upload";

export async function createHostelListing(
  data: CreateHostelListingData,
  photoUrls: UploadFile[] | null,
) {
  if (!photoUrls || photoUrls.length === 0) {
    throw new Error("Photo is required");
  }

  const photoPromises = photoUrls.map(photo =>
    uploadPhoto({
      entityName: data.name,
      entityType: "hostel",
      primaryPhoto: photo.file,
    }),
  );

  const publicUrls = await Promise.all(photoPromises);

  const dataWithPhotosAndAmenities = {
    ...data,
    photo_urls: publicUrls,
    is_verified: data.isVerified,
    amenities: data.amenities.map(amenity => amenity.text),
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/hostels`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataWithPhotosAndAmenities),
  });

  const response = await res.json();
  if (!response.success) {
    throw new Error(response.message);
  }

  return response as any as APIResponse<CreateHostelListingData>;
}

export async function fetchHostel(slug: string): Promise<APIResponse<Hostel> | null> {
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

export async function fetchHostelsByArea({
  areaFilters,
  hostelFilters,
  paginationFilters,
}: {
  areaFilters: AreaOptions;
  hostelFilters: HostelFilterOptions;
  paginationFilters: PaginationOptions;
}): Promise<APIResponse<Hostel[]>> {
  try {
    const paginationParams = paginationSerializer({
      page: paginationFilters.page,
      limit: paginationFilters.limit,
    });

    const areaParams = areaSerializer({
      areaType: areaFilters.areaType,
      areaId: areaFilters.areaId,
    });

    const hostelFilterParams = hostelFilterSerializer({
      sortBy: hostelFilters.sortBy,
      minPrice: hostelFilters.minPrice,
      maxPrice: hostelFilters.maxPrice,
      isVerified: hostelFilters.isVerified,
    });
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/hostels/search${areaParams}${hostelFilterParams && "&" + hostelFilterParams.replace("?", "")}${paginationParams && "&" + paginationParams.replace("?", "")}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch hostels by area");
    }

    return response.json() as any as APIResponse<Hostel[]>;
  } catch (error) {
    throw new Error("Failed to fetch hostels by area");
  }
}
