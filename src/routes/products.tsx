import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { PromoBar } from "@/components/landing/PromoBar";
import { WhatsAppFab } from "@/components/landing/WhatsAppFab";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, MessageCircle, FileText, Search } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  original_price: number | null;
  image_url: string | null;
  pdf_url: string | null;
  category: string;
  rating: number | null;
  badge: string | null;
}

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "All Products — DreamRest Mattresses, Pillows & Bedding" },
      { name: "description", content: "Browse our full collection of premium mattresses, pillows and bedding. Filter by category and enquire on WhatsApp." },
    ],
  }),
  component: AllProductsPage,
});

function AllProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const { settings } = useSiteSettings();

  useEffect(() => {
    supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("sort_order")
      .then(({ data }) => {
        if (data) setProducts(data as Product[]);
      });
  }, []);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["all", ...Array.from(set)];
  }, [products]);

  const filtered = products.filter(
    (p) =>
      (category === "all" || p.category === category) &&
      (query === "" || p.name.toLowerCase().includes(query.toLowerCase())),
  );

  const enquire = (product: Product) => {
    const num = settings.whatsapp_number || "919745358126";
    const text = encodeURIComponent(`Hi DreamRest! I'm interested in "${product.name}".`);
    supabase.from("enquiries").insert({
      message: `Product enquiry: ${product.name}`,
      source: `products-page:${product.category}`,
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
    <div className="min-h-screen bg-background">
      <PromoBar />
      <Header />

      <section className="border-b bg-secondary/40 py-10">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link> / Products
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold">All Products</h1>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Explore our complete range. Use the filters to find the perfect match.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="sm:w-56">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c} value={c} className="capitalize">
                    {c === "all" ? "All Categories" : c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {filtered.length === 0 ? (
            <p className="py-16 text-center text-muted-foreground">No products found.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filtered.map((p) => {
                const discount =
                  p.price && p.original_price && p.original_price > p.price
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
                        {p.badge && <Badge className="bg-primary text-primary-foreground">{p.badge}</Badge>}
                        {discount > 0 && (
                          <Badge className="bg-destructive text-destructive-foreground">-{discount}%</Badge>
                        )}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">{p.category}</p>
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
                          <span className="text-xs text-muted-foreground line-through">
                            ₹{p.original_price.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>
                      <Button
                        onClick={() => enquire(p)}
                        size="sm"
                        className="mt-3 w-full gap-1 bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90"
                      >
                        <MessageCircle size={14} /> Enquire
                      </Button>
                      {p.pdf_url && (
                        <a
                          href={p.pdf_url}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 flex items-center justify-center gap-1 rounded border px-2 py-1.5 text-xs font-medium text-primary hover:bg-secondary"
                        >
                          <FileText size={12} /> Download Brochure
                        </a>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppFab />
    </div>
  );
}
