import { createFileRoute } from "@tanstack/react-router";
import { CrudSection, productFields } from "@/components/admin/CrudSection";

export const Route = createFileRoute("/admin/dashboard/products")({
  head: () => ({ meta: [{ title: "Products — Elora Admin" }] }),
  component: () => <CrudSection table="products" fields={productFields} title="Products" />,
});
