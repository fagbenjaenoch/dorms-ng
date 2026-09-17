import useRecentSearches from "@/lib/hooks/useRecentSearches";
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "bun:test";

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
