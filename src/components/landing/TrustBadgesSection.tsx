import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BedDouble, Truck, ShieldCheck, CreditCard, Award, Clock, RefreshCw, Headphones } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface TrustBadge {
  id: string;
  title: string;
  subtitle: string | null;
  icon: string | null;
}

const ICON_MAP: Record<string, LucideIcon> = {
  BedDouble, Truck, ShieldCheck, CreditCard, Award, Clock, RefreshCw, Headphones,
};

export function TrustBadgesSection() {
  const [badges, setBadges] = useState<TrustBadge[]>([]);

  useEffect(() => {
    supabase
      .from("trust_badges")
      .select("*")
      .eq("is_active", true)
      .order("sort_order")
      .then(({ data }) => {
        if (data) setBadges(data);
      });
  }, []);

  if (badges.length === 0) return null;

  return (
    <section className="border-y bg-card py-8">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 md:grid-cols-4">
        {badges.map((b) => {
          const Icon = ICON_MAP[b.icon || ""] || ShieldCheck;
          return (
            <div key={b.id} className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon size={22} />
              </div>
              <div>
                <p className="text-sm font-semibold leading-tight">{b.title}</p>
                {b.subtitle && (
                  <p className="text-xs text-muted-foreground">{b.subtitle}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
