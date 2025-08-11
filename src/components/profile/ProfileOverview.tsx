import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import userImg from "../../assets/jurica-koletic-7YVZYZeITc8-unsplash.jpg";
import { Pencil } from "lucide-react";
export default function ProfileOverview() {
  return (
    <Card className="my-12 bg-white  border-gray-200">
      <CardContent className="p-6 px-12 flex items-center justify-between flex-wrap gap-12">
        {/* Right: Image */}
        <div className="w-28 h-28 rounded-full overflow-hidden ">
          <img src={userImg} alt="Profile Picture" className=" " />
        </div>

        {/* Center: Info */}
        <div className="flex-1 min-w-[200px] text-center sm:text-left space-y-1">
          <h2 className="text-xl font-semibold">John Doe</h2>
          <p className="text-muted-foreground text-sm">johndoe@email.com</p>
          <p className="text-muted-foreground text-sm">
            123 Main St, Lagos, Nigeria
          </p>
        </div>
        {/* Left: Edit button */}
        <div>
          <Button
            variant="outline"
            className="cursor-pointer bg-wite hover:bg-primary-light border-gray-300 border-1 rounded-full flex gap-2 justify-between items-center w-20 px-6"
          >
            Edit
            <Pencil />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
