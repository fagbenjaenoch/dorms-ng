import { LucideListFilter } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Field, FieldLabel } from "./ui/field";
import { Checkbox } from "./ui/checkbox";

export default function SearchFilters() {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost">
          <LucideListFilter />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <div className="flex gap-2 justify-between w-[65%]">
            <Button variant="ghost">Clear Filters</Button>
            <SheetTitle className="text-xl font-bold text-center">
              Filters
            </SheetTitle>
          </div>
        </SheetHeader>
        <div className="px-4 flex flex-col gap-4">
          <div>
            <Label>Min Price</Label>
          </div>
          <Field orientation="horizontal">
            <FieldLabel>Verfied listings</FieldLabel>
            <Checkbox />
          </Field>
        </div>
        <SheetFooter>
          <Button type="submit">Apply Filters</Button>
          <SheetClose>
            <Button variant="outline" className="w-full">
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
