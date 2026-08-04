import { createFileRoute } from "@tanstack/react-router";
import { CrudSection, offerFields } from "@/components/admin/CrudSection";

export const Route = createFileRoute("/admin/dashboard/offers")({
  head: () => ({ meta: [{ title: "Offers — Elora Admin" }] }),
  component: () => <CrudSection table="offers" fields={offerFields} title="Offers" />,
});
