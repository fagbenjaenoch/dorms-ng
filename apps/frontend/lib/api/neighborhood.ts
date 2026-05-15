import { APIResponse, CreateNeighborhood, Neighborhood } from "../dto";

export async function createNeighborhood(data: CreateNeighborhood) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/neighborhoods`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    if (!res.ok) {
      throw new Error("Failed to create neighborhood");
    }
    return res.json() as any as APIResponse<CreateNeighborhood>;
  } catch (error) {
    throw new Error("Failed to create neighborhood");
  }
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
