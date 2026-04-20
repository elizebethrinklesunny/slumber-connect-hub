import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/landing/Header";
import { PromoBar } from "@/components/landing/PromoBar";
import { BannerSection } from "@/components/landing/BannerSection";
import { TrustBadgesSection } from "@/components/landing/TrustBadgesSection";
import { OffersSection } from "@/components/landing/OffersSection";
import { CategoriesSection } from "@/components/landing/CategoriesSection";
import { ProductsSection } from "@/components/landing/ProductsSection";
import { MattressLayersSection } from "@/components/landing/MattressLayersSection";
import { DealOfWeekSection } from "@/components/landing/DealOfWeekSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { SuperSaleBanner } from "@/components/landing/SuperSaleBanner";
import { ContactSection } from "@/components/landing/ContactSection";
import { GallerySection } from "@/components/landing/GallerySection";
import { Footer } from "@/components/landing/Footer";
import { WhatsAppFab } from "@/components/landing/WhatsAppFab";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DreamRest — Premium Mattresses for Perfect Sleep" },
      { name: "description", content: "Shop premium mattresses, pillows & bedding from DreamRest. 120-night trial, free shipping, 10-year warranty. Chat on WhatsApp for instant help." },
      { property: "og:title", content: "DreamRest — Premium Mattresses" },
      { property: "og:description", content: "Premium mattresses with 120-night trial. Up to 60% OFF — free delivery nationwide." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen">
      <PromoBar />
      <Header />
      <BannerSection />
      <TrustBadgesSection />
      <OffersSection />
      <CategoriesSection />
      <ProductsSection />
      <MattressLayersSection />
      <DealOfWeekSection />
      <TestimonialsSection />
      <SuperSaleBanner />
      <ContactSection />
      <GallerySection />
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
