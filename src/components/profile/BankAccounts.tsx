"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const mockAccounts = [
  { id: 1, bank: "Access Bank", accountNumber: "0123456789" },
];

export default function BankAccounts() {
  const [accounts, setAccounts] = useState(mockAccounts);
  const [newAccount, setNewAccount] = useState({ bank: "", accountNumber: "" });

  const addAccount = () => {
    if (newAccount.bank && newAccount.accountNumber) {
      setAccounts([...accounts, { id: Date.now(), ...newAccount }]);
      setNewAccount({ bank: "", accountNumber: "" });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Withdrawal Bank Accounts</h2>

      {accounts.map((acc) => (
        <Card key={acc.id}>
          <CardContent className="p-4">
            <p className="font-medium">{acc.bank}</p>
            <p className="text-sm text-muted-foreground">{acc.accountNumber}</p>
          </CardContent>
        </Card>
      ))}

      <div className="space-y-2 max-w-md">
        <Input
          placeholder="Bank Name"
          value={newAccount.bank}
          onChange={(e) =>
            setNewAccount({ ...newAccount, bank: e.target.value })
          }
        />
        <Input
          placeholder="Account Number"
          value={newAccount.accountNumber}
          onChange={(e) =>
            setNewAccount({ ...newAccount, accountNumber: e.target.value })
          }
        />
        <Button onClick={addAccount}>Add Bank Account</Button>
      </div>
    </div>
  );
}
