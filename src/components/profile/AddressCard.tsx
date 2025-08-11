import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";

export default function AddressCard() {
  return (
    <Card className="my-12 bg-white  border-gray-200">
      <CardContent className="px-12 py-2 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold font-secondary">Address</h2>
          <Button
            variant="outline"
            className="cursor-pointer bg-white hover:bg-primary-light border border-gray-300 rounded-full flex gap-2 px-6"
          >
            Edit
            <Pencil className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted-foreground">Country</p>
            <p className="text-base font-medium">Nigeria</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">State</p>
            <p className="text-base font-medium">Lagos</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted-foreground">City</p>
            <p className="text-base font-medium">Lekki</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Street</p>
            <p className="text-base font-medium">123 Banana Island Road</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
