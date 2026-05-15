import { MapPin, X } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Button } from "./ui/button";

export default function LocationSearch() {
  return (
    <div>
      <InputGroup className="w-xl">
        <InputGroupInput placeholder="Search locations..." />
        <InputGroupAddon>
          <MapPin />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Button variant="ghost">
            <X />
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
