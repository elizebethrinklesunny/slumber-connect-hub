import { createFileRoute } from "@tanstack/react-router";
import { CrudSection, bannerFields } from "@/components/admin/CrudSection";

export const Route = createFileRoute("/admin/dashboard/banners")({
  head: () => ({ meta: [{ title: "Banners — DreamRest Admin" }] }),
  component: () => <CrudSection table="banners" fields={bannerFields} title="Banners" />,
});
