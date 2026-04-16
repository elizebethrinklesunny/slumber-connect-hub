import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Offer {
  id: string;
  title: string;
  description: string | null;
  discount_percentage: number | null;
  image_url: string | null;
}

const defaultOffers: Offer[] = [
  {
    id: "1",
    title: "Dream in Comfort",
    description: "Upgrade your sleep with our premium mattresses.",
    image_url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80",
    discount_percentage: null,
  },
  {
    id: "2",
    title: "Perfect Support, Every Night",
    description: "Discover pillows designed for your ultimate comfort.",
    image_url: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&q=80",
    discount_percentage: null,
  },
  {
    id: "3",
    title: "Transform Your Sleep Space",
    description: "Luxurious bedding to complete your cozy haven.",
    image_url: "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=600&q=80",
    discount_percentage: null,
  },
];

export function OffersSection() {
  const [offers, setOffers] = useState<Offer[]>(defaultOffers);

  useEffect(() => {
    supabase
      .from("offers")
      .select("*")
      .eq("is_active", true)
      .order("sort_order")
      .then(({ data }) => {
        if (data && data.length > 0) setOffers(data);
      });
  }, []);

  return (
    <section id="offers" className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">
            Discover All The Black Friday Deals
          </h2>
          <p className="mt-3 text-muted-foreground">
            Explore unbeatable savings this Black Friday event now!
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {offers.map((offer) => (
            <div key={offer.id} className="group cursor-pointer">
              <div className="overflow-hidden rounded-xl">
                <img
                  src={offer.image_url || "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80"}
                  alt={offer.title}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-4">
                <h3 className="font-display text-xl font-semibold text-navy">{offer.title}</h3>
                {offer.description && (
                  <p className="mt-1 text-sm text-muted-foreground">{offer.description}</p>
                )}
                <p className="mt-2 text-sm font-semibold text-foreground underline underline-offset-4">
                  {offer.discount_percentage ? `${offer.discount_percentage}% OFF` : "Starting At $299"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
