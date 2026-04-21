// Admin user management edge function — uses service role to create/update auth users.
// Caller must be authenticated AND have the 'admin' role in user_roles.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface ActionPayload {
  action: "list" | "create" | "update_email" | "update_password" | "delete";
  target_user_id?: string;
  email?: string;
  password?: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const ANON = Deno.env.get("SUPABASE_PUBLISHABLE_KEY") ?? Deno.env.get("SUPABASE_ANON_KEY")!;

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return json({ error: "Missing authorization" }, 401);
    }

    // Verify caller is admin
    const userClient = createClient(SUPABASE_URL, ANON, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userErr } = await userClient.auth.getUser();
    if (userErr || !userData.user) {
      return json({ error: "Invalid token" }, 401);
    }

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE);
    const { data: roles } = await admin
      .from("user_roles")
      .select("role")
      .eq("user_id", userData.user.id)
      .eq("role", "admin");

    if (!roles || roles.length === 0) {
      return json({ error: "Forbidden: admin role required" }, 403);
    }

    const body: ActionPayload = await req.json();

    switch (body.action) {
      case "list": {
        const { data: list, error } = await admin.auth.admin.listUsers();
        if (error) return json({ error: error.message }, 400);
        const { data: allRoles } = await admin.from("user_roles").select("user_id, role");
        const roleMap = new Map<string, string[]>();
        (allRoles ?? []).forEach((r) => {
          const arr = roleMap.get(r.user_id) ?? [];
          arr.push(r.role);
          roleMap.set(r.user_id, arr);
        });
        const users = list.users
          .filter((u) => (roleMap.get(u.id) ?? []).includes("admin"))
          .map((u) => ({
            id: u.id,
            email: u.email,
            created_at: u.created_at,
            last_sign_in_at: u.last_sign_in_at,
            roles: roleMap.get(u.id) ?? [],
          }));
        return json({ users });
      }

      case "create": {
        if (!body.email || !body.password) return json({ error: "Email and password required" }, 400);
        const { data: created, error } = await admin.auth.admin.createUser({
          email: body.email,
          password: body.password,
          email_confirm: true,
        });
        if (error) return json({ error: error.message }, 400);
        const { error: roleErr } = await admin
          .from("user_roles")
          .insert({ user_id: created.user.id, role: "admin" });
        if (roleErr) return json({ error: roleErr.message }, 400);
        return json({ user: { id: created.user.id, email: created.user.email } });
      }

      case "update_email": {
        if (!body.target_user_id || !body.email) return json({ error: "Missing fields" }, 400);
        const { error } = await admin.auth.admin.updateUserById(body.target_user_id, {
          email: body.email,
          email_confirm: true,
        });
        if (error) return json({ error: error.message }, 400);
        return json({ ok: true });
      }

      case "update_password": {
        if (!body.target_user_id || !body.password) return json({ error: "Missing fields" }, 400);
        const { error } = await admin.auth.admin.updateUserById(body.target_user_id, {
          password: body.password,
        });
        if (error) return json({ error: error.message }, 400);
        return json({ ok: true });
      }

      case "delete": {
        if (!body.target_user_id) return json({ error: "Missing user id" }, 400);
        if (body.target_user_id === userData.user.id) {
          return json({ error: "You cannot delete your own account" }, 400);
        }
        const { error } = await admin.auth.admin.deleteUser(body.target_user_id);
        if (error) return json({ error: error.message }, 400);
        return json({ ok: true });
      }

      default:
        return json({ error: "Unknown action" }, 400);
    }
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
