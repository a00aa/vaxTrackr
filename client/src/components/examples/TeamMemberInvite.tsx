import { useState } from "react";
import { TeamMemberInvite } from "../TeamMemberInvite";
import { Button } from "@/components/ui/button";

export default function TeamMemberInviteExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-8">
      <Button onClick={() => setOpen(true)}>Manage Team Members</Button>
      <TeamMemberInvite open={open} onOpenChange={setOpen} />
    </div>
  );
}
