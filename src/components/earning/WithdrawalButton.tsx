import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface WithdrawalSectionProps {
  withdrawal?: {
    availableBalance: number;
    totalEarnings: number;
    totalWithdrawals: number;
  };
}

const WithdrawalSection = ({ withdrawal }: WithdrawalSectionProps) => {
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");

  const availableBalance = withdrawal?.availableBalance || 0;

  const handleConfirm = () => {
    if (!amount || !method) {
      alert("Please enter all required fields.");
      return;
    }
    // You can connect this to your withdrawal mutation later
    console.log("Withdrawal Request:", { amount, method });
    setShowModal(false);
  };

  return (
    <>
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white mb-8 shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">Ready to withdraw?</h3>
            <p className="text-indigo-100">
              You have ₦{availableBalance.toLocaleString()} available for
              withdrawal
            </p>
          </div>

          <Button
            variant="secondary"
            className="bg-white text-indigo-600 hover:bg-indigo-50 px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform"
            onClick={() => setShowModal(true)}
          >
            Request Withdrawal
          </Button>
        </div>
      </div>

      {/* Withdrawal Dialog */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Request Withdrawal</DialogTitle>
            <DialogDescription>
              Enter your withdrawal details below.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Amount
              </label>
              <Input
                type="number"
                placeholder={`₦${availableBalance.toLocaleString()}`}
                className="rounded-xl"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Payment Method
              </label>
              <Select onValueChange={setMethod}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                  <SelectItem value="flutterwave">Flutterwave</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="flex gap-3 sm:gap-2">
            <Button
              variant="outline"
              onClick={() => setShowModal(false)}
              className="flex-1 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WithdrawalSection;
