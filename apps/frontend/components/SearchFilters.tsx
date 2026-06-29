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

const defaultPriceRange = [200_000, 300_000];
const maxPrice = 5_000_000;
const minPrice = 0;

export default function SearchFilters() {
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
        <div className="px-4 space-y-12">
          <div>
            <Label className="font-semibold text-lg">Sort By</Label>
            <div className="flex gap-4">
              <Button size="lg">Price: High to Low</Button>
              <Button size="lg" variant="neutral" className="bg-muted">
                Price: Low to High
              </Button>
            </div>
          </div>
          <div>
            <Label className="text-lg font-semibold">Price Range</Label>
            <div className="flex gap-4 mb-10">
              <div className="bg-muted rounded-xl p-3 font-semibold">
                <p className="text-muted-foreground">Min (₦)</p>
                <input
                  type="number"
                  className="w-full focus:outline-none text-lg"
                  value={minMax[0]}
                  onChange={e => setMinMax(prev => [Number(e.target.value), prev[1]])}
                />
              </div>
              <div className="bg-muted rounded-xl p-3 font-semibold">
                <p className="text-muted-foreground">Max (₦)</p>
                <input
                  type="number"
                  className="w-full focus:outline-none text-lg"
                  value={minMax[1]}
                  onChange={e => setMinMax(prev => [prev[0], Number(e.target.value)])}
                />
              </div>
            </div>
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
                step={100}
              />
            </div>
          </div>
          <Field orientation="horizontal">
            <FieldLabel className="font-semibold text-lg">Verfied listings</FieldLabel>
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
