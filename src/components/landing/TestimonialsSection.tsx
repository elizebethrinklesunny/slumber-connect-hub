import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface Testimonial {
  id: string;
  customer_name: string;
  rating: number;
  review_text: string;
  customer_image_url: string | null;
}

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    supabase
      .from("testimonials")
      .select("*")
      .eq("is_active", true)
      .order("sort_order")
      .then(({ data }) => {
        if (data) setTestimonials(data);
      });
  }, []);

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <Badge variant="secondary" className="mb-3 text-xs uppercase tracking-widest">
            Reviews
          </Badge>
          <h2 className="font-display text-4xl font-bold text-foreground">
            What Our Customers Say
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.id} className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < t.rating ? "fill-warm text-warm" : "text-muted"}
                    />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  "{t.review_text}"
                </p>
                <div className="mt-5 flex items-center gap-3">
                  {t.customer_image_url ? (
                    <img
                      src={t.customer_image_url}
                      alt={t.customer_name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {t.customer_name.charAt(0)}
                    </div>
                  )}
                  <span className="text-sm font-semibold">{t.customer_name}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
