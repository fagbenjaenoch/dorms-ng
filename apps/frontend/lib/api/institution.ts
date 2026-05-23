import { APIResponse, CreateInstitutionPayload, Institution } from "../dto";
import { CreateInstitutionData } from "../forms";

export async function createInstitution(data: CreateInstitutionData) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/institutions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const response = await res.json();
  if (!response.success) {
    throw new Error(response.message);
  }

  return response as any as APIResponse<CreateInstitutionPayload>;
}

export async function fetchInstitution(slug: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/institutions/${slug}`,
    );

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error("Failed to fetch institution");
    }

    return response.json() as any as APIResponse<Institution>;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchAllInstitutions() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/institutions`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch institutions");
    }

    return response.json() as any as APIResponse<Institution[]>;
  } catch (error) {
    console.error(error);
    return null;
  }
}
