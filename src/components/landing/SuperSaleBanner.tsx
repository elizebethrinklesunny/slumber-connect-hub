import { Button } from "@/components/ui/button";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { ArrowRight } from "lucide-react";

export function SuperSaleBanner() {
  const { settings } = useSiteSettings();
  if (settings.super_sale_active !== "true") return null;

  const inquire = () => {
    const num = settings.whatsapp_number || "919745358126";
    const text = encodeURIComponent("Hi! I'd like to know about the Super Sale offers.");
    window.open(`https://wa.me/${num}?text=${text}`, "_blank");
  };

  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-navy text-navy-foreground">
        <div className="grid items-center gap-6 px-8 py-12 md:grid-cols-2 md:px-16 md:py-16">
          <div>
            <p className="font-display text-5xl font-bold leading-none md:text-7xl">
              <span className="text-gold">{settings.super_sale_title || "SUPER SALE"}</span>
            </p>
            <p className="mt-3 text-lg opacity-90 md:text-xl">
              {settings.super_sale_subtitle || "Up to 70% OFF on selected mattresses"}
            </p>
          </div>
          <div className="flex md:justify-end">
            <Button
              onClick={inquire}
              size="lg"
              className="gap-2 bg-gold text-navy hover:bg-gold/90"
            >
              {settings.super_sale_cta || "Shop Now"} <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
