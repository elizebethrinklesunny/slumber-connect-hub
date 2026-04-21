import { createFileRoute } from "@tanstack/react-router";
import { CrudSection, testimonialFields } from "@/components/admin/CrudSection";

export const Route = createFileRoute("/admin/dashboard/testimonials")({
  head: () => ({ meta: [{ title: "Testimonials — DreamRest Admin" }] }),
  component: () => <CrudSection table="testimonials" fields={testimonialFields} title="Testimonials" />,
});
