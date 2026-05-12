import { APIResponse } from "../dto";
import { CreateNeighborhoodData } from "../forms";

export async function createNeighborhood(data: CreateNeighborhoodData) {
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
    return res.json() as any as APIResponse<CreateNeighborhoodData>;
  } catch (error) {
    throw new Error("Failed to create neighborhood");
  }
}
