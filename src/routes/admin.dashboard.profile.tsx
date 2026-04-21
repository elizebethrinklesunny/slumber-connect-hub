import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { User, Mail, Calendar, Shield } from "lucide-react";

export const Route = createFileRoute("/admin/dashboard/profile")({
  head: () => ({ meta: [{ title: "Profile — DreamRest Admin" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const [user, setUser] = useState<{ id: string; email: string; created_at: string; last_sign_in_at: string | null } | null>(null);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingEmail, setSavingEmail] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user: u } }) => {
      if (u) {
        setUser({
          id: u.id,
          email: u.email || "",
          created_at: u.created_at,
          last_sign_in_at: u.last_sign_in_at ?? null,
        });
        setNewEmail(u.email || "");
      }
    });
  }, []);

  const handleEmailUpdate = async () => {
    if (!newEmail || newEmail === user?.email) return;
    setSavingEmail(true);
    const { error } = await supabase.auth.updateUser({ email: newEmail });
    setSavingEmail(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Email update requested. Check your inbox to confirm.");
  };

  const handlePasswordUpdate = async () => {
    if (newPassword.length < 8) { toast.error("Password must be at least 8 characters"); return; }
    if (newPassword !== confirmPassword) { toast.error("Passwords do not match"); return; }
    setSavingPassword(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setSavingPassword(false);
    if (error) { toast.error(error.message); return; }
    setNewPassword(""); setConfirmPassword("");
    toast.success("Password updated successfully");
  };

  if (!user) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="font-display text-3xl font-bold">My Profile</h2>
        <p className="text-sm text-muted-foreground">Manage your account information.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 rounded-lg border p-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <User className="h-6 w-6" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">{user.email}</p>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <Shield size={12} /> Administrator
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border p-3 text-sm">
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar size={12} /> Member since
              </p>
              <p className="mt-1 font-medium">{new Date(user.created_at).toLocaleDateString()}</p>
            </div>
            <div className="rounded-lg border p-3 text-sm">
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar size={12} /> Last login
              </p>
              <p className="mt-1 font-medium">
                {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : "—"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Mail size={18} /> Change Email</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1">
            <Label>New Email</Label>
            <Input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
          </div>
          <Button onClick={handleEmailUpdate} disabled={savingEmail || newEmail === user.email}>
            {savingEmail ? "Updating..." : "Update Email"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1">
            <Label>New Password</Label>
            <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="At least 8 characters" />
          </div>
          <div className="space-y-1">
            <Label>Confirm Password</Label>
            <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          <Button onClick={handlePasswordUpdate} disabled={savingPassword}>
            {savingPassword ? "Updating..." : "Update Password"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
