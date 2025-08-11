import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function FiltersBar() {
  return (
    <div className="flex gap-4 flex-wrap items-center mb-4">
      <Select>
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

      <Button variant="outline" className="hover:bg-primary-light">
        Reset Filters
      </Button>
    </div>
  );
}
