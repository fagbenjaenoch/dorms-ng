import { APIResponse, SearchResult } from "../dto";

const queryParam = "search";

export async function search(
  query: string,
  { signal }: { signal: AbortSignal },
): Promise<APIResponse<SearchResult[]>> {
  try {
    let path = `http://localhost:8000/api/v1/search?${queryParam}=${query}`;

    const res = await fetch(path, {
      method: "GET",
      signal,
    });

    if (!res.json) throw new Error("could not search item");
    return res.json();
  } catch (err) {
    throw new Error("could not search item");
  }
}
