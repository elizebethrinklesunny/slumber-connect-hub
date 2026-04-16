import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Banner {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string | null;
  cta_text: string | null;
  cta_link: string | null;
}

const defaultBanners: Banner[] = [
  {
    id: "1",
    title: "Experience The Ultimate Luxury",
    subtitle: "Have your most restful holiday yet with full body alignment from 5 support zones",
    image_url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1920&q=80",
    cta_text: "Explore Collection",
    cta_link: "#categories",
  },
  {
    id: "2",
    title: "Transform Your Sleep Experience",
    subtitle: "Enjoy unmatched comfort and support with innovative mattress and bedding solutions.",
    image_url: "https://images.unsplash.com/photo-1616627561839-074385245ff6?w=1920&q=80",
    cta_text: "Explore Collection",
    cta_link: "#categories",
  },
  {
    id: "3",
    title: "Redefine Rest and Relaxation",
    subtitle: "Discover premium mattresses and bedding tailored for perfect sleep every night.",
    image_url: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1920&q=80",
    cta_text: "Explore Collection",
    cta_link: "#categories",
  },
];

export function BannerSection() {
  const [banners, setBanners] = useState<Banner[]>(defaultBanners);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    supabase
      .from("banners")
      .select("*")
      .eq("is_active", true)
      .order("sort_order")
      .then(({ data }) => {
        if (data && data.length > 0) setBanners(data);
      });
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;
    const t = setInterval(() => setCurrent((c) => (c + 1) % banners.length), 5000);
    return () => clearInterval(t);
  }, [banners.length]);

  const banner = banners[current];

  return (
    <section className="relative h-[85vh] overflow-hidden">
      {banners.map((b, i) => (
        <div
          key={b.id}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            opacity: i === current ? 1 : 0,
            backgroundImage: b.image_url
              ? `url(${b.image_url})`
              : "linear-gradient(135deg, #1a2a5e 0%, #2c4a8a 100%)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative flex h-full items-end px-6 pb-28 md:items-center md:pb-0 md:px-16">
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl font-bold leading-tight tracking-wide text-white md:text-6xl lg:text-7xl">
            {banner.title}
          </h1>
          {banner.subtitle && (
            <p className="mt-5 max-w-lg text-base text-white/80 md:text-lg">
              {banner.subtitle}
            </p>
          )}
          {banner.cta_text && (
            <button
              onClick={() => {
                if (banner.cta_link?.startsWith("#")) {
                  document.getElementById(banner.cta_link.slice(1))?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-navy shadow-lg transition hover:bg-white/90"
            >
              {banner.cta_text}
            </button>
          )}
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-white" : "w-2.5 bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Arrows */}
      {banners.length > 1 && (
        <>
          <button
            onClick={() => setCurrent((c) => (c - 1 + banners.length) % banners.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/15 p-3 backdrop-blur-sm transition hover:bg-white/30"
          >
            <ChevronLeft className="text-white" size={20} />
          </button>
          <button
            onClick={() => setCurrent((c) => (c + 1) % banners.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/15 p-3 backdrop-blur-sm transition hover:bg-white/30"
          >
            <ChevronRight className="text-white" size={20} />
          </button>
        </>
      )}
    </section>
  );
}
