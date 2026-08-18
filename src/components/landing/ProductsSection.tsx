import { useMemo, useState } from "react";
import { useLandingData } from "@/contexts/LandingDataContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MessageCircle, FileText } from "lucide-react";

export function ProductsSection() {
  const { products, settings } = useLandingData();
  const [tab, setTab] = useState("all");

  const categories = useMemo(() => {
    const set = new Set<string>(products.map((p) => p.category));
    return ["all", ...Array.from(set)];
  }, [products]);

  const filtered = tab === "all" ? products : products.filter((p) => p.category === tab);

  if (products.length === 0) return null;

  const inquireOnWhatsApp = (product: typeof products[number]) => {
    const num = settings.whatsapp_number || "919745358126";
    const text = encodeURIComponent(`Hi Elora! I'm interested in "${product.name}". Could you share more details?`);
    supabase.from("enquiries").insert({
      message: `Product enquiry: ${product.name}`,
      source: `product:${product.category}`,
      product_id: product.id,
    }).then(() => {});
    window.open(`https://wa.me/${num}?text=${text}`, "_blank");
  };

  const openBrochure = (url: string, productName: string) => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      const a = document.createElement("a");
      a.href = url;
      a.download = `${productName.replace(/\s+/g, "_")}_Brochure.pdf`;
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
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
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <Button
                      onClick={() => inquireOnWhatsApp(p)}
                      size="sm"
                      className="gap-1 bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90"
                    >
                      <MessageCircle size={14} /> Enquire
                    </Button>
                    <Button
                      onClick={() => p.pdf_url && openBrochure(p.pdf_url, p.name)}
                      disabled={!p.pdf_url}
                      size="sm"
                      variant="outline"
                      className="gap-1"
                    >
                      <FileText size={14} /> Brochure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
