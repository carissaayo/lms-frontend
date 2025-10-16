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
import { SlidersHorizontal, RotateCcw } from "lucide-react";

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
    <div className="flex flex-wrap items-center  gap-12 p-6 bg-gradient-to-br from-white/90 to-gray-50/80 backdrop-blur-xl rounded-2xl shadow-sm border border-gray-100">
      {/* Sort Dropdown */}
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 mr-6">
          <SlidersHorizontal className="w-5 h-5" />
        </div>
        <Select value={sort} onValueChange={onSortChange}>
          <SelectTrigger className="w-52 border-gray-200 rounded-xl shadow-sm bg-white/90 py-6.5 ">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent className="rounded-xl shadow-lg">
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="recent">Newest</SelectItem>
            <SelectItem value="priceLowHigh">Price: Low to High</SelectItem>
            <SelectItem value="priceHighLow">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Price Range Inputs */}
      <div className="flex items-center gap-3 bg-white/80 border border-gray-200 rounded-xl px-4 py-2.5 shadow-sm">
        <Input
          type="number"
          min="0"
          placeholder="Min"
          value={minPrice}
          onChange={(e) => onMinPriceChange(e.target.value)}
          className="w-24 border-none focus:ring-0 bg-transparent text-gray-700 placeholder:text-gray-400"
        />
        <span className="text-gray-400">–</span>
        <Input
          type="number"
          min="0"
          placeholder="Max"
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(e.target.value)}
          className="w-24 border-none focus:ring-0 bg-transparent text-gray-700 placeholder:text-gray-400"
        />
      </div>

      {/* Reset Filters */}
      <Button
        variant="outline"
        onClick={onReset}
        className="flex items-center gap-2 border-gray-200 text-gray-700 bg-white/80 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white rounded-xl shadow-sm transition-all duration-300"
      >
        <RotateCcw className="w-4 h-4" />
        Reset
      </Button>
    </div>
  );
}

export const FiltersBar = memo(FiltersBarComponent);
