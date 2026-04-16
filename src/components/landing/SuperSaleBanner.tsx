export function SuperSaleBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-gold/20 via-gold/10 to-gold/20 py-20">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Summer 2026 Collection
        </p>
        <h2 className="mt-3 font-display text-4xl font-bold text-navy md:text-5xl">
          Super Sale Up To 50%
        </h2>
        <p className="mt-3 text-muted-foreground">Reserved for special occasions</p>
        <button className="mt-8 rounded-full bg-navy px-8 py-3 text-sm font-semibold text-navy-foreground transition hover:bg-navy/90">
          Discover Now
        </button>
      </div>
    </section>
  );
}
