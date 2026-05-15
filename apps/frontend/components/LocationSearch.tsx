"use client";

import { SearchIcon, X } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Button } from "./ui/button";

interface LocationSearchProps {
  searchTerm: string;
  clearSearch: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function LocationSearch({
  searchTerm,
  clearSearch,
  handleChange,
}: LocationSearchProps) {
  return (
    <div>
      <InputGroup className="w-xl">
        <InputGroupInput
          placeholder="Search locations..."
          value={searchTerm}
          onChange={handleChange}
        />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        {searchTerm.length > 0 && (
          <InputGroupAddon align="inline-end">
            <Button variant="ghost" onClick={clearSearch}>
              <X />
            </Button>
          </InputGroupAddon>
        )}
      </InputGroup>
    </div>
  );
}
