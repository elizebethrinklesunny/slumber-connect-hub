import { createFileRoute } from "@tanstack/react-router";
import { CrudSection, galleryFields } from "@/components/admin/CrudSection";

export const Route = createFileRoute("/admin/dashboard/gallery")({
  head: () => ({ meta: [{ title: "Gallery — Elora Admin" }] }),
  component: () => <CrudSection table="gallery_images" fields={galleryFields} title="Gallery" />,
});
