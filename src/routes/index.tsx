import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/landing/Header";
import { BannerSection } from "@/components/landing/BannerSection";
import { OffersSection } from "@/components/landing/OffersSection";
import { CategoriesSection } from "@/components/landing/CategoriesSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { ContactSection } from "@/components/landing/ContactSection";
import { Footer } from "@/components/landing/Footer";
import { WhatsAppFab } from "@/components/landing/WhatsAppFab";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DreamRest — Premium Mattresses for Perfect Sleep" },
      { name: "description", content: "Shop premium mattresses from DreamRest. Explore categories, exclusive offers, and customer reviews. Contact us on WhatsApp." },
      { property: "og:title", content: "DreamRest — Premium Mattresses" },
      { property: "og:description", content: "Shop premium mattresses. Exclusive offers & free delivery." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen">
      <Header />
      <BannerSection />
      <OffersSection />
      <CategoriesSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
