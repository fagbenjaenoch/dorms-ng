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
    if (recentSearches.length === 10) {
      setRecentSearches([search, ...recentSearches.slice(0, 9)]);
      return;
    }

    if (recentSearches.includes(search)) {
      let filteredSearches = recentSearches.filter(s => s != search);
      setRecentSearches([search, ...filteredSearches]);
      return;
    }
    setRecentSearches([search, ...recentSearches]);
  };

  return { recentSearches, addSearch };
}
