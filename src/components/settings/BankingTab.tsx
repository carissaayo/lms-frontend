import { useBankAccounts, useUpdateBankAccounts } from "@/lib/api/settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Plus } from "lucide-react";

export default function BankingTab() {
  const { data: accounts = [], isLoading } = useBankAccounts();
  const { mutate: addBank } = useUpdateBankAccounts();

  if (isLoading) return <p>Loading bank accounts...</p>;

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Bank Accounts</CardTitle>
        <Button onClick={() => addBank({ bankName: "Test Bank" })}>
          <Plus className="w-4 h-4 mr-2" />
          Add Account
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {accounts.length === 0 ? (
          <div className="text-center text-gray-500 py-6">
            <Building2 className="mx-auto w-8 h-8 mb-2 text-gray-400" />
            No bank accounts added
          </div>
        ) : (
          accounts.map((acc) => (
            <div
              key={acc.id}
              className="p-4 border rounded-lg flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{acc.bankName}</p>
                <p className="text-sm text-gray-500">
                  {acc.accountName} ({acc.accountNumber})
                </p>
              </div>
              <Button variant="destructive" size="sm">
                Delete
              </Button>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
