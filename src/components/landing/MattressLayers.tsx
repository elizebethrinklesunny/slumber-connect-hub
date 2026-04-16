const layers = [
  { num: 1, title: "Breathable Knit Cover", desc: "A soft, breathable knit fabric that enhances airflow and helps regulate temperature." },
  { num: 2, title: "Cooling Gel Memory Foam", desc: "Infused with cooling gel to disperse heat and relieve pressure on shoulders, hips, and back." },
  { num: 3, title: "Adaptive Transition Layer", desc: "A responsive layer that gently adapts to your body, providing balanced support." },
  { num: 4, title: "Reinforced Edge Support", desc: "Strengthened edge foam enhances durability and stability across the full surface." },
  { num: 5, title: "High-Density Base Foam", desc: "A sturdy foundation layer that delivers long-lasting support and durability." },
];

export function MattressLayers() {
  return (
    <section className="bg-secondary py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">
            Designed for Perfect Sleep
          </h2>
          <p className="mt-3 text-muted-foreground">
            Discover the advanced layers and premium materials that make our mattresses the ultimate sleep solution
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {/* Mattress image placeholder */}
          <div className="flex items-center justify-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80"
                alt="Mattress layers"
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute bottom-4 left-4 flex gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <span key={n} className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </div>
          {/* Layers list */}
          <div className="space-y-6">
            {layers.map((l) => (
              <div key={l.num} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold text-sm font-bold text-gold-foreground">
                  {l.num}
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-navy">{l.num} - {l.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{l.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
