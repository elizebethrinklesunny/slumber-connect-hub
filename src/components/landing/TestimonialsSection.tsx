import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Star } from "lucide-react";

interface Testimonial {
  id: string;
  customer_name: string;
  rating: number;
  review_text: string;
  customer_image_url: string | null;
}

const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    customer_name: "Balla Daniella",
    rating: 5,
    review_text: "Perfect blend of softness and firmness. It provides great neck support while sleeping and is also fantastic for propping up during movie nights or working from bed.",
    customer_image_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
  },
  {
    id: "2",
    customer_name: "Katona Beatrix",
    rating: 5,
    review_text: "This pillow has exceeded my expectations! It's incredibly soft but doesn't lose its shape, making it perfect for long reading sessions or relaxing in bed on weekends.",
    customer_image_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  },
  {
    id: "3",
    customer_name: "Miksa Fruzsina",
    rating: 5,
    review_text: "Extremely comfortable and supportive. I've noticed less neck pain since switching to this, and it's great for lounging in bed with my laptop or watching shows.",
    customer_image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    id: "4",
    customer_name: "Kende Lili",
    rating: 5,
    review_text: "The best pillow I've ever owned! It's incredibly cozy yet firm enough to provide excellent back support when I'm sitting up to journal, read, or watch TV.",
    customer_image_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
  },
];

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials);

  useEffect(() => {
    supabase
      .from("testimonials")
      .select("*")
      .eq("is_active", true)
      .order("sort_order")
      .then(({ data }) => {
        if (data && data.length > 0) setTestimonials(data);
      });
  }, []);

  return (
    <section id="testimonials" className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">
              Hear From Our Happy Customers
            </h2>
            <p className="mt-2 text-muted-foreground">
              Discover why our customers love their sleep experiences with us!
            </p>
          </div>
          <button className="rounded-full border-2 border-navy px-6 py-2.5 text-sm font-semibold text-navy transition hover:bg-navy hover:text-navy-foreground">
            Read All Testimonials
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="group flex flex-col gap-4 overflow-hidden rounded-xl border bg-card shadow-sm transition hover:shadow-md md:flex-row"
            >
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < t.rating ? "fill-gold text-gold" : "text-muted"}
                      />
                    ))}
                  </div>
                  <h3 className="mt-3 font-display text-base font-bold text-foreground leading-snug">
                    {t.review_text.length > 60
                      ? t.review_text.substring(0, 60).trim() + "..."
                      : t.review_text}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t.review_text}
                  </p>
                </div>
                <p className="mt-4 text-sm font-semibold text-navy">{t.customer_name}</p>
              </div>
              {t.customer_image_url && (
                <div className="w-full shrink-0 md:w-48">
                  <img
                    src={t.customer_image_url}
                    alt={t.customer_name}
                    className="h-48 w-full object-cover md:h-full"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
