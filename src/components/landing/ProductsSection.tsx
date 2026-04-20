import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MessageCircle } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  original_price: number | null;
  image_url: string | null;
  category: string;
  rating: number | null;
  badge: string | null;
}

export function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [tab, setTab] = useState("all");
  const { settings } = useSiteSettings();

  useEffect(() => {
    supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("sort_order")
      .then(({ data }) => {
        if (data) setProducts(data);
      });
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>(products.map((p) => p.category));
    return ["all", ...Array.from(set)];
  }, [products]);

  const filtered = tab === "all" ? products : products.filter((p) => p.category === tab);

  if (products.length === 0) return null;

  const inquireOnWhatsApp = (productName: string) => {
    const num = settings.whatsapp_number || "919745358126";
    const text = encodeURIComponent(`Hi DreamRest! I'm interested in "${productName}". Could you share more details?`);
    window.open(`https://wa.me/${num}?text=${text}`, "_blank");
  };

  return (
    <section id="products" className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 text-center">
          <Badge variant="secondary" className="mb-3 text-xs uppercase tracking-widest">
            Featured
          </Badge>
          <h2 className="font-display text-4xl font-bold">Our Best Sellers</h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Hand-picked premium products loved by thousands of happy sleepers
          </p>
        </div>

        <Tabs value={tab} onValueChange={setTab} className="mb-10">
          <TabsList className="mx-auto flex w-fit">
            {categories.map((c) => (
              <TabsTrigger key={c} value={c} className="capitalize">
                {c === "all" ? "All Products" : c}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((p) => {
            const discount = p.price && p.original_price && p.original_price > p.price
              ? Math.round(((p.original_price - p.price) / p.original_price) * 100)
              : 0;
            return (
              <Card key={p.id} className="group overflow-hidden border-0 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-square overflow-hidden bg-secondary">
                  {p.image_url && (
                    <img
                      src={p.image_url}
                      alt={p.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute left-2 top-2 flex flex-col gap-1">
                    {p.badge && (
                      <Badge className="bg-primary text-primary-foreground">{p.badge}</Badge>
                    )}
                    {discount > 0 && (
                      <Badge className="bg-destructive text-destructive-foreground">-{discount}%</Badge>
                    )}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="line-clamp-1 font-semibold">{p.name}</h3>
                  <div className="mt-1 flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={i < Math.floor(p.rating || 0) ? "fill-warm text-warm" : "text-muted"}
                      />
                    ))}
                    <span className="ml-1 text-xs text-muted-foreground">({(p.rating || 0).toFixed(1)})</span>
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    {p.price !== null && (
                      <span className="text-lg font-bold text-primary">₹{p.price.toLocaleString("en-IN")}</span>
                    )}
                    {p.original_price !== null && p.original_price > (p.price || 0) && (
                      <span className="text-xs text-muted-foreground line-through">₹{p.original_price.toLocaleString("en-IN")}</span>
                    )}
                  </div>
                  <Button
                    onClick={() => inquireOnWhatsApp(p.name)}
                    size="sm"
                    className="mt-3 w-full gap-1 bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90"
                  >
                    <MessageCircle size={14} /> Enquire
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
