import { createFileRoute } from "@tanstack/react-router";
import { CrudSection, categoryFields } from "@/components/admin/CrudSection";

export const Route = createFileRoute("/admin/dashboard/categories")({
  head: () => ({ meta: [{ title: "Categories — DreamRest Admin" }] }),
  component: () => <CrudSection table="categories" fields={categoryFields} title="Categories" />,
});
