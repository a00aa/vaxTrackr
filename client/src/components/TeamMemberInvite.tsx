import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { UserPlus, X, Mail } from "lucide-react";

interface TeamMemberInviteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TeamMemberInvite({ open, onOpenChange }: TeamMemberInviteProps) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("staff");
  const [invitedMembers, setInvitedMembers] = useState<Array<{ email: string; role: string; status: string }>>([
    { email: "dr.smith@facility.com", role: "doctor", status: "accepted" },
    { email: "nurse.jane@facility.com", role: "nurse", status: "pending" },
  ]);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Inviting team member:", { email, role });
    setInvitedMembers([...invitedMembers, { email, role, status: "pending" }]);
    setEmail("");
    setRole("staff");
  };

  const handleResendInvite = (memberEmail: string) => {
    console.log("Resending invite to:", memberEmail);
  };

  const handleRemoveInvite = (index: number) => {
    setInvitedMembers(invitedMembers.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl" data-testid="modal-team-invite">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-facility" />
            Manage Team Members
          </DialogTitle>
          <DialogDescription>
            Invite staff members to join your facility
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <form onSubmit={handleInvite} className="space-y-4 p-4 rounded-lg border bg-muted/50">
            <h4 className="font-medium">Send New Invitation</h4>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="invite-email">Email Address</Label>
                <Input
                  id="invite-email"
                  type="email"
                  placeholder="team.member@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  data-testid="input-invite-email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="invite-role">Role</Label>
                <Select value={role} onValueChange={setRole} required>
                  <SelectTrigger id="invite-role" data-testid="select-invite-role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="doctor">Doctor</SelectItem>
                    <SelectItem value="nurse">Nurse</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full" data-testid="button-send-invite">
                <Mail className="h-4 w-4 mr-2" />
                Send Invitation
              </Button>
            </div>
          </form>

          <div className="space-y-3">
            <h4 className="font-medium text-sm text-muted-foreground">TEAM MEMBERS</h4>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {invitedMembers.map((member, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border hover-elevate transition-all"
                  data-testid={`invited-member-${index}`}
                >
                  <div className="flex-1 space-y-1">
                    <p className="font-medium text-sm">{member.email}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="capitalize text-xs">
                        {member.role}
                      </Badge>
                      <Badge
                        className={
                          member.status === "accepted"
                            ? "bg-vaccinated-bg text-vaccinated-text text-xs"
                            : "bg-pending-bg text-pending-text text-xs"
                        }
                      >
                        {member.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {member.status === "pending" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleResendInvite(member.email)}
                        data-testid={`button-resend-${index}`}
                      >
                        Resend
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveInvite(index)}
                      data-testid={`button-remove-invite-${index}`}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
