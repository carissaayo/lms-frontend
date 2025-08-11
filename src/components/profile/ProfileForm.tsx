"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function ProfileForm() {
  const [form, setForm] = useState({
    name: "John Doe",
    email: "johndoe@email.com",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Edit Profile</h2>
      <div className="space-y-3 max-w-md">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
