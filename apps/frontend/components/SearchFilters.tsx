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
import { Slider } from "./ui/slider";
import { useState } from "react";
import useMoneyFormat from "@/lib/hooks/useMoneyFormat";

export default function SearchFilters() {
  const defaultPriceRange = [200_000, 300_000];
  const maxPrice = 10_000_000;
  const minPrice = 20_000;
  const formatter = useMoneyFormat("standard");
  const [minMax, setMinMax] = useState(defaultPriceRange);

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="ghost">
            <LucideListFilter />
            Filters
          </Button>
        }
      ></SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <div className="flex gap-2 items-center justify-between w-[65%]">
            <Button variant="ghost">Clear Filters</Button>
            <SheetTitle className="text-xl font-bold text-center">Filter</SheetTitle>
          </div>
        </SheetHeader>
        <div className="px-4 flex flex-col gap-4">
          <div>
            <Label className="text-lg font-bold">Price Range: {minMax.join(", ")}</Label>
            <div className="relative w-full">
              <span className="absolute left-0 -top-5 text-xs text-muted-foreground">
                {formatter.format(minPrice)}
              </span>
              <span className="absolute right-0 -top-5 text-xs text-muted-foreground">
                {formatter.format(maxPrice)}
              </span>
              <Slider
                className="my-6"
                defaultValue={defaultPriceRange}
                value={minMax}
                onValueChange={value => setMinMax(value as number[])}
                min={minPrice}
                max={maxPrice}
                step={1}
              />
            </div>
          </div>
          <Field orientation="horizontal">
            <FieldLabel className="font-bold text-lg">Verfied listings</FieldLabel>
            <Checkbox className="w-5 h-5" />
          </Field>
        </div>
        <SheetFooter>
          <Button type="submit">Apply Filters</Button>
          <SheetClose
            render={
              <Button variant="outline" className="w-full">
                Close
              </Button>
            }
          ></SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
