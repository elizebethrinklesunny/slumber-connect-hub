import { Truck, ShieldCheck, Clock, CreditCard, MapPin } from "lucide-react";

const reasons = [
  { icon: Clock, title: "120-Day In-Home Trial", desc: "Try DreamRest 120 days, return if unsatisfied." },
  { icon: Truck, title: "Free Shipping & Returns", desc: "All products ship free and feature free returns." },
  { icon: ShieldCheck, title: "10-Year Limited Warranty", desc: "Sleep easy with DreamRest's 10-year warranty." },
  { icon: CreditCard, title: "Financing Options", desc: "Pay monthly, no fees — say yes to DreamRest." },
  { icon: MapPin, title: "Nationwide Delivery", desc: "We deliver to every corner of the country." },
];

export function WhyBuySection() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">
            Why Buy DreamRest Online?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Discover the advanced layers and premium materials that make our mattresses the ultimate sleep solution
          </p>
        </div>
        <div className="flex flex-wrap items-start justify-center gap-8">
          {reasons.map((r) => (
            <div key={r.title} className="flex w-48 flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-gold/30 text-gold">
                <r.icon size={26} />
              </div>
              <h3 className="mt-3 text-sm font-bold text-foreground">{r.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
