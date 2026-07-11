import { Hostel } from "../dto";
import { useLocalStorage } from "./useLocalstorage";

const savedHostelsKey = "saved_hostels";

export function useSaveHostel() {
  const [savedHostels, setSavedHostels] = useLocalStorage<Hostel[]>(savedHostelsKey, []);

  const saveHostel = (hostel: Hostel) => {
    setSavedHostels([...savedHostels, hostel]);
  };

  const removeHostel = (hostelId: string) => {
    setSavedHostels(savedHostels.filter(h => h._id !== hostelId));
  };

  return {
    savedHostels,
    saveHostel,
    removeHostel,
  };
}
