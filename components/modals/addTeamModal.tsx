"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Button from "../ui/Button";
import { Check } from "lucide-react";

export default function AddTeamMemberFlow({
    step,onClose ,setStep
}:any) {
//   const [step, setStep] = useState(1);
  const [search, setSearch] = useState("");
  const [members] = useState([
    { id: 1, name: "Alice Johnson", email: "alice@example.com" },
    { id: 2, name: "Bob Smith", email: "bob@example.com" },
    { id: 3, name: "Charlie Lee", email: "charlie@example.com" },
  ]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedPermission, setSelectedPermission] = useState("view");

  return (
    <div>
      {/* Step 1: Search + Select */}
      <Dialog open={ step === 1} onOpenChange={() => setStep(0)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Team Member</DialogTitle>
          </DialogHeader>

          <Input
            placeholder="Search member by email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="mt-4 max-h-40 overflow-y-auto border rounded p-2">
            {members
              .filter((m) => m.email.includes(search))
              .map((m) => (
                <div
                  key={m.id}
                  className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                  onClick={() => {
                    setSelectedMember(m);
                    setStep(2);
                  }}
                >
                  <p className="font-medium">{m.name}</p>
                  <p className="text-sm text-gray-500">{m.email}</p>
                </div>
              ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Step 2: Confirm + Permission */}
      <Dialog open={step === 2} onOpenChange={() => setStep(0)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Member</DialogTitle>
          </DialogHeader>

          {selectedMember && (
            <div className="space-y-4">
              <div className="p-3 border rounded-md bg-gray-50">
                <p className="">Team: <span className="text-primary">Design Team</span></p>
                <p className="">Member: <span className="text-primary">{selectedMember.name}</span></p>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">Permission</label>
                <Select value={selectedPermission} onValueChange={setSelectedPermission}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose permission" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="edit">Edit</SelectItem>
                    <SelectItem value="view">View</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
            <Button onClick={() => setStep(3)}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Step 3: Success */}
      <Dialog open={ step === 3} onOpenChange={() => setStep(0)}>
        <DialogContent className="text-center">
          <DialogHeader>
            <DialogTitle className="text-green-600 texxt-center  flex justify-center "><Check className="rounded w-fit border-3 rounded-full border-[green]" width={50} height={50}/></DialogTitle>
          </DialogHeader>
          <p className="text-gray-600 mt-2">
            {selectedMember?.name} has been successfully added with <b>{selectedPermission}</b> permission.
          </p>
          <DialogFooter>
            <Button onClick={() => setStep(0)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
