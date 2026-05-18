"use client";

import { SearchIcon, X } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Button } from "./ui/button";

interface LocationSearchProps {
  searchTerm: string;
  clearSearch: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (e: React.MouseEvent<HTMLInputElement>) => void;
}

export default function LocationSearch({
  searchTerm,
  clearSearch,
  handleChange,
  onClick,
}: LocationSearchProps) {
  return (
    <InputGroup>
      <InputGroupInput
        placeholder="Search locations..."
        value={searchTerm}
        onChange={handleChange}
        onClick={onClick}
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
  );
}
