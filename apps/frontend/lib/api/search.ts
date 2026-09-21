import { APIResponse, Place, SearchResult } from "../dto";
import { searchQueryParam } from "../utils";

export async function search(
  query: string,
  { signal }: { signal: AbortSignal },
): Promise<APIResponse<SearchResult[]>> {
  try {
    const path = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/search?${searchQueryParam}=${query}`;

    const res = await fetch(path, {
      method: "GET",
      signal,
    });

    if (!res.json) throw new Error("could not search item");
    return res.json() as unknown as APIResponse<SearchResult[]>;
  } catch (err) {
    throw new Error("could not search item", { cause: err });
  }
}

export async function placeSearch(
  query: string,
  { signal }: { signal: AbortSignal },
): Promise<APIResponse<Place[]>> {
  try {
    const path = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/search/places?${searchQueryParam}=${query}`;

    const res = await fetch(path, {
      method: "GET",
      signal,
    });

    if (!res.json) throw new Error("could not search place");
    return res.json() as unknown as APIResponse<Place[]>;
  } catch (err) {
    throw new Error("could not search place", { cause: err });
  }
}
