import { Star } from "lucide-react";

const products = [
  { name: "DreamRest Icomfort Plush Mattress", price: "$899.00", oldPrice: "$999.00", badge: "-10%", rating: 5, reviews: 1, image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&q=80" },
  { name: "DreamRest Extra Firm Latex Foam", price: "$699.00", badge: "BEST SELLER", rating: 5, reviews: 2, image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&q=80" },
  { name: "ProAdapt Medium Hybrid 12\" Mattress", price: "$799.00", badge: "NEW ARRIVAL", rating: 4, reviews: 1, image: "https://images.unsplash.com/photo-1616627561839-074385245ff6?w=500&q=80" },
  { name: "DreamRest Icomfort Eco Mattress", price: "$599.00", badge: "FEATURED", rating: 4.5, reviews: 2, image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500&q=80" },
  { name: "Perfect Sleeper Nights Mattress", price: "$799.00", oldPrice: "$999.00", badge: "-20%", rating: 4.5, reviews: 2, image: "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=500&q=80" },
  { name: "DreamRest Memory Foam Coral", price: "$499.00", rating: 5, reviews: 1, image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500&q=80" },
];

const tabs = ["Mattresses", "Pillows", "Bedding"];

export function ProductsSection() {
  return (
    <section id="products" className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* Tabs */}
        <div className="mb-10 flex items-center justify-center gap-8">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              className={`font-display text-lg font-semibold transition ${
                i === 0
                  ? "text-navy underline underline-offset-8 decoration-2"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <div key={p.name} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl bg-secondary">
                {p.badge && (
                  <span className={`absolute left-3 top-3 z-10 rounded px-2.5 py-1 text-[11px] font-bold uppercase text-white ${
                    p.badge.startsWith("-") ? "bg-primary" : p.badge === "BEST SELLER" ? "bg-navy" : "bg-navy/80"
                  }`}>
                    {p.badge}
                  </span>
                )}
                <img
                  src={p.image}
                  alt={p.name}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      className={i < Math.floor(p.rating) ? "fill-gold text-gold" : "text-muted"}
                    />
                  ))}
                  <span className="ml-1 text-xs text-muted-foreground">
                    {p.rating} ({p.reviews})
                  </span>
                </div>
                <h3 className="mt-1.5 text-sm font-medium text-foreground">{p.name}</h3>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-sm font-bold text-foreground">{p.price}</span>
                  {p.oldPrice && (
                    <span className="text-xs text-muted-foreground line-through">{p.oldPrice}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button className="rounded-full border-2 border-navy px-8 py-3 text-sm font-semibold text-navy transition hover:bg-navy hover:text-navy-foreground">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
}
