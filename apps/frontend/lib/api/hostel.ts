import { toast } from "sonner";
import { APIResponse, Hostel } from "../dto";
import { CreateHostelListingData } from "../forms";

export async function createHostelListing(
  data: CreateHostelListingData,
  primaryPhoto: File | null,
) {
  try {
    if (!primaryPhoto) {
      throw new Error("Primary photo is required");
    }

    const formData = new FormData();
    formData.append("primaryPhoto", primaryPhoto);

    const presignedUrlReqBody = {
      entity_name: data.name,
      entity_type: "hostel",
    };

    const presignedUrlReq = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/presigned-url`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(presignedUrlReqBody),
      },
    );
    if (!presignedUrlReq.ok) {
      throw new Error("Failed to get presigned URL");
    }

    const presignedUrlRes = (await presignedUrlReq.json()) as any as APIResponse<{
      upload_url: string;
      public_url: string;
    }>;

    const uploadReq = await fetch(presignedUrlRes.payload.upload_url, {
      method: "PUT",
      headers: {
        "Content-Type": primaryPhoto.type,
      },
      body: primaryPhoto,
    });
    if (!uploadReq.ok) {
      toast.error("could not upload primary photo");
      throw new Error("Failed to upload primary photo");
    }

    const dataWithPrimaryPhoto = {
      ...data,
      primary_photo_url: presignedUrlRes.payload.public_url,
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/hostels`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataWithPrimaryPhoto),
    });
    if (!res.ok) {
      console.error(await res.json());
      throw new Error("Failed to create hostel");
    }
    return res.json() as any as APIResponse<CreateHostelListingData>;
  } catch (error) {
    console.error(error);
    toast.error("An error occured while trying to create hostel");
    throw new Error("Failed to create hostel");
  }
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
