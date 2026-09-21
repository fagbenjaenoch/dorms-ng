import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "bun:test";

import useRecentSearches from "@/lib/hooks/useRecentSearches";

describe("useRecentSearches", () => {
  it("should return empty array with no recent searches", () => {
    const { result } = renderHook(() => useRecentSearches());
    expect(result.current.recentSearches).toEqual([]);
  });

  it("should return recent searches", () => {
    const { result } = renderHook(() => useRecentSearches());

    act(() => {
      result.current.addSearch("test");
    });

    expect(result.current.recentSearches).toEqual(["test"]);
  });
});
