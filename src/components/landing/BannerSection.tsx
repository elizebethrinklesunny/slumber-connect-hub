import { useState, useEffect } from "react";
import { useLandingData } from "@/contexts/LandingDataContext";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function BannerSection() {
  const { banners } = useLandingData();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;
    const t = setInterval(() => setCurrent((c) => (c + 1) % banners.length), 5000);
    return () => clearInterval(t);
  }, [banners.length]);

  if (banners.length === 0) {
    return (
      <section className="relative flex min-h-[70vh] items-center justify-center bg-gradient-to-br from-primary/10 via-accent/30 to-secondary">
        <div className="text-center">
          <h1 className="font-display text-5xl font-bold leading-tight text-foreground md:text-7xl">
            Sleep Like Never Before
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Premium mattresses crafted for your perfect night's rest
          </p>
          <Button size="lg" className="mt-8 px-8 text-base">Shop Now</Button>
        </div>
      </section>
    );
  }

  const banner = banners[current];

  return (
    <section className="relative min-h-[70vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: banner.image_url
            ? `url(${banner.image_url})`
            : "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
        }}
      />
      <div className="absolute inset-0 bg-foreground/40" />
      <div className="relative flex min-h-[70vh] items-center justify-center px-4">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold text-white drop-shadow-lg md:text-7xl">
            {banner.title}
          </h1>
          {banner.subtitle && (
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/90 drop-shadow">
              {banner.subtitle}
            </p>
          )}
          {banner.cta_text && (
            <Button size="lg" className="mt-8 px-8 text-base">
              {banner.cta_text}
            </Button>
          )}
        </div>
      </div>

      {banners.length > 1 && (
        <>
          <button
            onClick={() => setCurrent((c) => (c - 1 + banners.length) % banners.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur transition hover:bg-white/40"
          >
            <ChevronLeft className="text-white" size={24} />
          </button>
          <button
            onClick={() => setCurrent((c) => (c + 1) % banners.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur transition hover:bg-white/40"
          >
            <ChevronRight className="text-white" size={24} />
          </button>
          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2.5 rounded-full transition-all ${i === current ? "w-8 bg-white" : "w-2.5 bg-white/50"}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
