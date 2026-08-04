import { createFileRoute } from "@tanstack/react-router";
import { CrudSection, dealFields } from "@/components/admin/CrudSection";

export const Route = createFileRoute("/admin/dashboard/deals")({
  head: () => ({ meta: [{ title: "Deals — Elora Admin" }] }),
  component: () => <CrudSection table="deals" fields={dealFields} title="Deals" />,
});
