import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/landing/Header";
import { BannerSection } from "@/components/landing/BannerSection";
import { TrustBadges } from "@/components/landing/TrustBadges";
import { OffersSection } from "@/components/landing/OffersSection";
import { CategoriesSection } from "@/components/landing/CategoriesSection";
import { ProductsSection } from "@/components/landing/ProductsSection";
import { MattressLayers } from "@/components/landing/MattressLayers";
import { DealOfWeek } from "@/components/landing/DealOfWeek";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { SuperSaleBanner } from "@/components/landing/SuperSaleBanner";
import { WhyBuySection } from "@/components/landing/WhyBuySection";
import { ContactSection } from "@/components/landing/ContactSection";
import { ImageGallery } from "@/components/landing/ImageGallery";
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
      <TrustBadges />
      <OffersSection />
      <CategoriesSection />
      <ProductsSection />
      <MattressLayers />
      <DealOfWeek />
      <TestimonialsSection />
      <SuperSaleBanner />
      <ContactSection />
      <WhyBuySection />
      <ImageGallery />
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
