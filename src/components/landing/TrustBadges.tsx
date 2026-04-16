import { Truck, ShieldCheck, Clock, CreditCard } from "lucide-react";

const badges = [
  { icon: Clock, title: "120-Day In-Home Trial", desc: "Try DreamRest 120 days, return if unsatisfied." },
  { icon: Truck, title: "Free Shipping & Returns", desc: "All products ship free and feature free returns." },
  { icon: ShieldCheck, title: "10-Year Limited Warranty", desc: "Sleep easy with DreamRest's 10-year warranty." },
  { icon: CreditCard, title: "Financing Options", desc: "Pay monthly, no fees — say yes to DreamRest." },
];

export function TrustBadges() {
  return (
    <section className="border-b bg-background py-8">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 md:grid-cols-4">
        {badges.map((b) => (
          <div key={b.title} className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gold/30 text-gold">
              <b.icon size={22} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">{b.title}</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
