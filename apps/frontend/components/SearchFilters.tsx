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
import { useCallback, useState } from "react";
import useMoneyFormat from "@/lib/hooks/useMoneyFormat";
import { useQueryStates } from "nuqs";
import { hostelFilterParsers, SortByValue } from "@/lib/api/filter";

const defaultPriceRange = [200_000, 300_000];
const maxPrice = 5_000_000;
const minPrice = 0;

interface DraftFilters {
  sortBy: SortByValue;
  minPrice: number | null;
  maxPrice: number | null;
  isVerified: boolean;
}

export default function SearchFilters() {
  const formatter = useMoneyFormat("standard");
  const [minMax, setMinMax] = useState(defaultPriceRange);
  const [open, setOpen] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [appliedFilters, setAppliedFilters] = useQueryStates(hostelFilterParsers, {
    history: "push",
    shallow: false,
  });
  const [draftFilters, setDraftFilters] = useState<DraftFilters>({
    sortBy: (appliedFilters.sortBy as SortByValue) ?? ("price-asc" as const),
    minPrice: appliedFilters.minPrice ?? null,
    maxPrice: appliedFilters.maxPrice ?? null,
    isVerified: appliedFilters.isVerified ?? false,
  });

  const handleSortByChange = useCallback(
    (value: SortByValue) => {
      setDraftFilters({ ...draftFilters, sortBy: value });
      setIsDirty(true);
    },
    [draftFilters, setDraftFilters],
  );

  const handlePriceRangeChange = useCallback(
    (value: number[] | null) => {
      setMinMax(value !== null ? value : defaultPriceRange);
      setDraftFilters({
        ...draftFilters,
        minPrice: value?.[0] ?? null,
        maxPrice: value?.[1] ?? null,
      });
      setIsDirty(true);
    },
    [draftFilters, setDraftFilters, setMinMax],
  );

  const handleIsVerifiedChange = useCallback(
    (value: boolean) => {
      setDraftFilters({ ...draftFilters, isVerified: value });
      setIsDirty(true);
    },
    [draftFilters, setDraftFilters],
  );

  const applyFilters = useCallback(() => {
    setAppliedFilters({
      sortBy: draftFilters.sortBy,
      minPrice: draftFilters.minPrice,
      maxPrice: draftFilters.maxPrice,
      isVerified: draftFilters.isVerified,
    });
    setOpen(false);
    setIsDirty(prev => prev !== false);
  }, [draftFilters, setAppliedFilters]);

  const resetFilters = useCallback(() => {
    setDraftFilters({
      sortBy: "price-asc",
      minPrice: null,
      maxPrice: null,
      isVerified: false,
    });
    setMinMax(defaultPriceRange);
    setIsDirty(false);
  }, [setDraftFilters, setMinMax]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" onClick={() => setOpen(true)} className="relative">
            {isDirty && (
              <span className="absolute top-1 right-0 w-2 h-2 bg-primary rounded-full"></span>
            )}
            <LucideListFilter />
            Filters
          </Button>
        }
      ></SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <div className="flex gap-2 items-center justify-between w-[65%]">
            <Button variant="ghost" onClick={resetFilters}>
              Clear Filters
            </Button>
            <SheetTitle className="text-xl font-bold text-center">Filter</SheetTitle>
          </div>
        </SheetHeader>
        <div className="px-4 space-y-12">
          <div>
            <Label className="font-semibold text-lg">Sort By</Label>
            <div className="flex gap-4">
              <Button
                size="lg"
                variant={draftFilters.sortBy === "price-desc" ? "default" : "neutral"}
                onClick={() => handleSortByChange("price-desc")}
              >
                Price: High to Low
              </Button>
              <Button
                size="lg"
                variant={draftFilters.sortBy === "price-asc" ? "default" : "neutral"}
                onClick={() => handleSortByChange("price-asc")}
              >
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
                  value={draftFilters.minPrice ?? minMax[0]}
                  onChange={e =>
                    handlePriceRangeChange([Number(e.target.value), minMax[1]])
                  }
                />
              </div>
              <div className="bg-muted rounded-xl p-3 font-semibold">
                <p className="text-muted-foreground">Max (₦)</p>
                <input
                  type="number"
                  className="w-full focus:outline-none text-lg"
                  value={draftFilters.maxPrice ?? minMax[1]}
                  onChange={e =>
                    handlePriceRangeChange([minMax[0], Number(e.target.value)])
                  }
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
                onValueChange={value => handlePriceRangeChange(value as number[])}
                min={minPrice}
                max={maxPrice}
                step={100}
              />
            </div>
          </div>
          <Field orientation="horizontal">
            <FieldLabel className="font-semibold text-lg">Verfied listings</FieldLabel>
            <Checkbox
              className="w-5 h-5"
              checked={draftFilters.isVerified ?? false}
              onCheckedChange={handleIsVerifiedChange}
            />
          </Field>
        </div>
        <SheetFooter>
          <Button type="submit" onClick={applyFilters}>
            Apply Filters
          </Button>
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
