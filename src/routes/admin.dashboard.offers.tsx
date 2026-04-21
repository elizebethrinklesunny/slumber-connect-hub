import { createFileRoute } from "@tanstack/react-router";
import { CrudSection, offerFields } from "@/components/admin/CrudSection";

export const Route = createFileRoute("/admin/dashboard/offers")({
  head: () => ({ meta: [{ title: "Offers — DreamRest Admin" }] }),
  component: () => <CrudSection table="offers" fields={offerFields} title="Offers" />,
});
