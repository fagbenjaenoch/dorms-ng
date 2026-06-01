import { recentSearchesKey } from "../utils";
import { useLocalStorage } from "./useLocalstorage";

export default function useRecentSearches(): {
  recentSearches: string[];
  addSearch: (search: string) => void;
} {
  const [recentSearches, setRecentSearches] = useLocalStorage<string[]>(
    recentSearchesKey,
    [],
  );

  const addSearch = (search: string) => {
    if (recentSearches.length === 0) {
      setRecentSearches([search]);
      return;
    }
    if (recentSearches.length === 10) {
      setRecentSearches([search, ...recentSearches.slice(0, 9)]);
      return;
    }
    setRecentSearches([search, ...recentSearches]);
  };

  return { recentSearches, addSearch };
}
