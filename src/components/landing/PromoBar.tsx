import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Sparkles } from "lucide-react";

export function PromoBar() {
  const { settings } = useSiteSettings();
  if (settings.promo_bar_active !== "true") return null;
  const text = settings.promo_bar_text || "🔥 Mega Sale on Premium Mattresses";
  return (
    <div className="bg-navy text-navy-foreground">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center text-xs font-medium md:text-sm">
        <Sparkles size={14} className="text-gold" />
        <span>{text}</span>
      </div>
    </div>
  );
}
