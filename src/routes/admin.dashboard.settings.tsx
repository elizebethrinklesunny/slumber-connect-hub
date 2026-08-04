import { createFileRoute } from "@tanstack/react-router";
import { SettingsTab } from "@/components/admin/SettingsTab";

export const Route = createFileRoute("/admin/dashboard/settings")({
  head: () => ({ meta: [{ title: "Site Settings — Elora Admin" }] }),
  component: () => (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-3xl font-bold">Site Settings</h2>
        <p className="text-sm text-muted-foreground">Configure global site settings shown on the landing page.</p>
      </div>
      <SettingsTab />
    </div>
  ),
});
