import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
const SuspensionReasonCard = ({suspendReason}:{suspendReason:string}) => {
  return (
    <>
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-900 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Suspension Reason
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-800">{suspendReason}</p>
          </CardContent>
        </Card>
    </>
  );
}

export default SuspensionReasonCard