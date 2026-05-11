import { APIResponse, CreateInstitutionPayload, Institution } from "../dto";
import { CreateInstitutionData } from "../forms";

export async function createInstitution(data: CreateInstitutionData) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/institutions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    if (!res.ok) {
      throw new Error("Failed to create institution");
    }
    return res.json() as any as APIResponse<CreateInstitutionPayload>;
  } catch (error) {
    throw new Error("Failed to create institution");
  }
}

export async function fetchInstitution(slug: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/institutions/${slug}`,
    );

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error("Failed to fetch hostel");
    }

    return response.json() as any as APIResponse<Institution>;
  } catch (error) {
    console.error(error);
    return null;
  }
}
