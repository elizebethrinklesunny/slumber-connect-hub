import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus, Trash2, Mail, Key, UserPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/admin/dashboard/admins")({
  head: () => ({ meta: [{ title: "Admin Users — Elora Admin" }] }),
  component: AdminsPage,
});

interface AdminUser {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  roles: string[];
}

async function callAdminFn(payload: Record<string, unknown>) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("Not authenticated");
  const { data, error } = await supabase.functions.invoke("admin-users", {
    body: payload,
    headers: { Authorization: `Bearer ${session.access_token}` },
  });
  if (error) throw new Error(error.message);
  if (data?.error) throw new Error(data.error);
  return data;
}

function AdminsPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // create dialog
  const [createOpen, setCreateOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [creating, setCreating] = useState(false);

  // edit dialog
  const [editTarget, setEditTarget] = useState<AdminUser | null>(null);
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setCurrentUserId(user.id);
      const data = await callAdminFn({ action: "list" });
      setUsers(data.users || []);
    } catch (e) {
      toast.error((e as Error).message);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async () => {
    if (!newEmail || newPassword.length < 8) {
      toast.error("Email and password (min 8 chars) required");
      return;
    }
    setCreating(true);
    try {
      await callAdminFn({ action: "create", email: newEmail, password: newPassword });
      toast.success("Admin user created");
      setNewEmail(""); setNewPassword(""); setCreateOpen(false);
      load();
    } catch (e) {
      toast.error((e as Error).message);
    }
    setCreating(false);
  };

  const handleUpdateEmail = async () => {
    if (!editTarget || !editEmail) return;
    try {
      await callAdminFn({ action: "update_email", target_user_id: editTarget.id, email: editEmail });
      toast.success("Email updated");
      setEditTarget(null);
      load();
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  const handleUpdatePassword = async () => {
    if (!editTarget || editPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    try {
      await callAdminFn({ action: "update_password", target_user_id: editTarget.id, password: editPassword });
      toast.success("Password updated");
      setEditPassword("");
      setEditTarget(null);
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  const handleDelete = async (u: AdminUser) => {
    if (!confirm(`Delete admin user ${u.email}?`)) return;
    try {
      await callAdminFn({ action: "delete", target_user_id: u.id });
      toast.success("User deleted");
      load();
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-3xl font-bold">Admin Users</h2>
          <p className="text-sm text-muted-foreground">Manage who has admin access to this dashboard.</p>
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button><Plus size={16} className="mr-1" /> New Admin</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2"><UserPlus size={18} /> Create Admin User</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div className="space-y-1">
                <Label>Email</Label>
                <Input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label>Password</Label>
                <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="At least 8 characters" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setCreateOpen(false)}>Cancel</Button>
              <Button onClick={handleCreate} disabled={creating}>
                {creating ? "Creating..." : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : (
        <div className="space-y-3">
          {users.map((u) => (
            <Card key={u.id}>
              <CardContent className="flex flex-wrap items-center justify-between gap-3 p-4">
                <div className="min-w-0">
                  <p className="truncate font-semibold">{u.email}</p>
                  <p className="text-xs text-muted-foreground">
                    Created {new Date(u.created_at).toLocaleDateString()}
                    {u.last_sign_in_at && ` · Last login ${new Date(u.last_sign_in_at).toLocaleDateString()}`}
                    {u.id === currentUserId && " · You"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditTarget(u);
                      setEditEmail(u.email);
                      setEditPassword("");
                    }}
                  >
                    Edit
                  </Button>
                  {u.id !== currentUserId && (
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(u)}>
                      <Trash2 size={14} />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
          {users.length === 0 && (
            <Card><CardContent className="py-8 text-center text-muted-foreground">No admin users.</CardContent></Card>
          )}
        </div>
      )}

      <Dialog open={!!editTarget} onOpenChange={(open) => !open && setEditTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit {editTarget?.email}</DialogTitle>
          </DialogHeader>
          {editTarget && (
            <div className="space-y-5">
              <Card>
                <CardHeader className="pb-3"><CardTitle className="flex items-center gap-2 text-base"><Mail size={16} /> Email</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  <Input type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
                  <Button size="sm" onClick={handleUpdateEmail} disabled={editEmail === editTarget.email}>
                    Update Email
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3"><CardTitle className="flex items-center gap-2 text-base"><Key size={16} /> Password</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  <Input type="password" placeholder="New password (min 8 chars)" value={editPassword} onChange={(e) => setEditPassword(e.target.value)} />
                  <Button size="sm" onClick={handleUpdatePassword} disabled={editPassword.length < 8}>
                    Update Password
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
