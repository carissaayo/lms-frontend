"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function PasswordChangeForm() {
  const [form, setForm] = useState({ current: "", new: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-4 max-w-md">
      <h2 className="text-lg font-semibold">Change Password</h2>
      <div className="space-y-1">
        <Label htmlFor="current">Current Password</Label>
        <Input
          id="current"
          name="current"
          type="password"
          value={form.current}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="new">New Password</Label>
        <Input
          id="new"
          name="new"
          type="password"
          value={form.new}
          onChange={handleChange}
        />
      </div>
      <Button>Update Password</Button>
    </div>
  );
}
