import { APIResponse, CreateNeighborhood } from "../dto";

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
