// components/course-catalog/FiltersBar.tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { memo } from "react";

interface FiltersBarProps {
  sort: string;
  minPrice: string;
  maxPrice: string;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onReset: () => void;
}

export function FiltersBarComponent({
  sort,
  minPrice,
  maxPrice,
  onSortChange,
  onMinPriceChange,
  onMaxPriceChange,
  onReset,
}: FiltersBarProps) {
  return (
    <div className="flex gap-4 flex-wrap items-center mb-12">
      {/* Sort Dropdown */}
      <Select value={sort} onValueChange={onSortChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="popular">Most Popular</SelectItem>
          <SelectItem value="recent">Newest</SelectItem>
          <SelectItem value="priceLowHigh">Price: Low to High</SelectItem>
          <SelectItem value="priceHighLow">Price: High to Low</SelectItem>
        </SelectContent>
      </Select>

      {/* Price Range Inputs */}
      <div className="flex items-center gap-2">
        <Input
          type="number"
          min="0"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => onMinPriceChange(e.target.value)}
          className="w-28"
        />
        <span className="text-muted-foreground">-</span>
        <Input
          type="number"
          min="0"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(e.target.value)}
          className="w-28"
        />
      </div>

      {/* Reset Filters */}
      <Button
        variant="outline"
        className="hover:bg-primary-light"
        onClick={onReset}
      >
        Reset Filters
      </Button>
    </div>
  );
}
export const FiltersBar = memo(FiltersBarComponent);
