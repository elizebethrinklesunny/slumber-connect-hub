import { useState, useEffect } from "react";
import { useLandingData } from "@/contexts/LandingDataContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle } from "lucide-react";

function useCountdown(target: string | null) {
  const [remaining, setRemaining] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    if (!target) return;
    const tick = () => {
      const diff = new Date(target).getTime() - Date.now();
      if (diff <= 0) { setRemaining({ d: 0, h: 0, m: 0, s: 0 }); return; }
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setRemaining({ d, h, m, s });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  return remaining;
}

function TimeBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center rounded-xl bg-navy/90 px-3 py-2 text-navy-foreground md:px-5 md:py-3">
      <span className="font-display text-2xl font-bold tabular-nums md:text-4xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[10px] uppercase tracking-widest opacity-70 md:text-xs">{label}</span>
    </div>
  );
}

export function DealOfWeekSection() {
  const { deal, settings } = useLandingData();
  const time = useCountdown(deal?.ends_at || null);

  if (!deal) return null;

  const inquire = () => {
    const num = settings.whatsapp_number || "919745358126";
    const text = encodeURIComponent(`Hi! I want to grab the Deal of the Week: "${deal.title}".`);
    window.open(`https://wa.me/${num}?text=${text}`, "_blank");
  };

  return (
    <section id="deal" className="bg-gradient-to-br from-primary via-primary to-navy py-20 text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="overflow-hidden rounded-3xl shadow-2xl">
            {deal.image_url && (
              <img src={deal.image_url} alt={deal.title} className="h-full w-full object-cover" />
            )}
          </div>
          <div>
            <Badge className="mb-3 bg-gold text-navy">Deal of the Week</Badge>
            <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl">{deal.title}</h2>
            {deal.description && <p className="mt-3 text-lg opacity-90">{deal.description}</p>}

            {(deal.price !== null || deal.original_price !== null) && (
              <div className="mt-5 flex items-baseline gap-3">
                {deal.price !== null && (
                  <span className="font-display text-4xl font-bold">₹{deal.price.toLocaleString("en-IN")}</span>
                )}
                {deal.original_price !== null && (
                  <span className="text-lg line-through opacity-60">₹{deal.original_price.toLocaleString("en-IN")}</span>
                )}
              </div>
            )}

            <div className="mt-6">
              <p className="mb-3 text-sm uppercase tracking-widest opacity-80">Hurry — ends in</p>
              <div className="flex gap-2 md:gap-3">
                <TimeBox label="Days" value={time.d} />
                <TimeBox label="Hours" value={time.h} />
                <TimeBox label="Min" value={time.m} />
                <TimeBox label="Sec" value={time.s} />
              </div>
            </div>

            <Button
              onClick={inquire}
              size="lg"
              className="mt-8 gap-2 bg-gold text-navy hover:bg-gold/90"
            >
              <MessageCircle size={18} /> Grab This Deal
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
