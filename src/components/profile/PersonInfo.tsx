import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil } from "lucide-react";

export default function PersonalInfoCard() {
  return (
    <Card className="my-12 bg-white  border-gray-200">
      <CardContent className="p-6 px-12 space-y-6">
        <div className="flex justify-between items-center ">
          <h2 className="text-lg font-semibold">Personal Information</h2>
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
            <p className="text-sm text-muted-foreground">First Name</p>
            <p className="text-base font-medium">John</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Last Name</p>
            <p className="text-base font-medium">Doe</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted-foreground">Phone Number</p>
            <p className="text-base font-medium">+234 901 234 5678</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="text-base font-medium">johndoe@email.com</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
