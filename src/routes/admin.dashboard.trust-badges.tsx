import { createFileRoute } from "@tanstack/react-router";
import { CrudSection, trustBadgeFields } from "@/components/admin/CrudSection";

export const Route = createFileRoute("/admin/dashboard/trust-badges")({
  head: () => ({ meta: [{ title: "Trust Badges — DreamRest Admin" }] }),
  component: () => <CrudSection table="trust_badges" fields={trustBadgeFields} title="Trust Badges" />,
});
