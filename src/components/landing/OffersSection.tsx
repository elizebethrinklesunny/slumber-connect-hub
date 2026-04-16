import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Percent } from "lucide-react";

interface Offer {
  id: string;
  title: string;
  description: string | null;
  discount_percentage: number | null;
  image_url: string | null;
}

export function OffersSection() {
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    supabase
      .from("offers")
      .select("*")
      .eq("is_active", true)
      .order("sort_order")
      .then(({ data }) => {
        if (data) setOffers(data);
      });
  }, []);

  if (offers.length === 0) return null;

  return (
    <section id="offers" className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <Badge variant="secondary" className="mb-3 text-xs uppercase tracking-widest">
            Limited Time
          </Badge>
          <h2 className="font-display text-4xl font-bold text-foreground">
            Hot Offers
          </h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Don't miss out on these amazing deals on premium mattresses
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer) => (
            <Card key={offer.id} className="group overflow-hidden border-0 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
              {offer.image_url && (
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={offer.image_url}
                    alt={offer.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl font-semibold">{offer.title}</h3>
                    {offer.description && (
                      <p className="mt-2 text-sm text-muted-foreground">{offer.description}</p>
                    )}
                  </div>
                  {offer.discount_percentage && (
                    <Badge className="flex shrink-0 items-center gap-1 bg-primary text-primary-foreground">
                      <Percent size={12} />
                      {offer.discount_percentage}% OFF
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
