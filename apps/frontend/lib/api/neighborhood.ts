import { APIResponse, Neighborhood } from "../dto";
import { CreateNeighborhoodData } from "../forms";

export async function createNeighborhood(data: CreateNeighborhoodData) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/neighborhoods`, {
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

  return response as any as APIResponse<CreateNeighborhoodData>;
}

export async function fetchAllNeighborhoods() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/neighborhoods`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch institutions");
    }

    return response.json() as any as APIResponse<Neighborhood[]>;
  } catch (error) {
    console.error(error);
    return null;
  }
}
