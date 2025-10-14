import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Plus, X } from "lucide-react";

interface BankAccount {
  bankName: string;
  accountName: string;
  accountNumber: string;
}

interface BankingTabProps {
  accounts: BankAccount[];
  user: { id: string; name: string; email: string };
  onAddBank: () => void;
  onEditBank?: (index: number) => void;
  onDeleteBank: (index: number) => void;
  bankForm: BankAccount;
  onFormChange: (field: string, value: string) => void;
  isAddingBank: boolean;
}

export default function BankingTab({
  accounts = [],
  user,
  onAddBank,
  onEditBank,
  onDeleteBank,
  bankForm,
  onFormChange,
  isAddingBank,
}: BankingTabProps) {
  return (
    <Card className="animate-fadeIn">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Bank Accounts</CardTitle>
        {!isAddingBank && (
          <Button onClick={onAddBank} variant="default">
            <Plus className="w-4 h-4 mr-2" />
            Add Account
          </Button>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        {isAddingBank && (
          <div className="p-4 border rounded-lg bg-gray-50 space-y-4">
            <div>
              <Label>Bank Name</Label>
              <Input
                placeholder="Enter bank name"
                value={bankForm.bankName}
                onChange={(e) => onFormChange("bankName", e.target.value)}
              />
            </div>
            <div>
              <Label>Account Name</Label>
              <Input
                placeholder="Enter account name"
                value={bankForm.accountName}
                onChange={(e) => onFormChange("accountName", e.target.value)}
              />
            </div>
            <div>
              <Label>Account Number</Label>
              <Input
                placeholder="Enter account number"
                value={bankForm.accountNumber}
                onChange={(e) => onFormChange("accountNumber", e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => onFormChange("cancel", "")}>
                <X className="w-4 h-4 mr-1" />
                Cancel
              </Button>
              <Button onClick={onAddBank} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Save Bank
              </Button>
            </div>
          </div>
        )}

        {accounts.length === 0 && !isAddingBank ? (
          <div className="text-center text-gray-500 py-6">
            <Building2 className="mx-auto w-8 h-8 mb-2 text-gray-400" />
            No bank accounts added
          </div>
        ) : (
          accounts.map((acc, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg flex justify-between items-center bg-white shadow-sm"
            >
              <div>
                <p className="font-medium text-gray-900">{acc.bankName}</p>
                <p className="text-sm text-gray-500">
                  {acc.accountName} ({acc.accountNumber})
                </p>
              </div>
              <div className="flex gap-2">
                {onEditBank && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEditBank(index)}
                  >
                    Edit
                  </Button>
                )}
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDeleteBank(index)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
      </Card>
  );
}
