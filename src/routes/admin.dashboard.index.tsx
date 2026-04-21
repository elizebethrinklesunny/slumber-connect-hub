import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Package, Layers, Star, Image as ImageIcon, Tag } from "lucide-react";

export const Route = createFileRoute("/admin/dashboard/")({
  head: () => ({ meta: [{ title: "Dashboard — DreamRest Admin" }] }),
  component: DashboardHome,
});

interface Stats {
  enquiries: number;
  newEnquiries: number;
  products: number;
  categories: number;
  testimonials: number;
  banners: number;
  offers: number;
}

function DashboardHome() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recent, setRecent] = useState<Array<{ id: string; customer_name: string | null; message: string | null; created_at: string; status: string }>>([]);

  useEffect(() => {
    const load = async () => {
      const [enq, newEnq, products, categories, testimonials, banners, offers, recentEnq] = await Promise.all([
        supabase.from("enquiries").select("id", { count: "exact", head: true }),
        supabase.from("enquiries").select("id", { count: "exact", head: true }).eq("status", "new"),
        supabase.from("products").select("id", { count: "exact", head: true }),
        supabase.from("categories").select("id", { count: "exact", head: true }),
        supabase.from("testimonials").select("id", { count: "exact", head: true }),
        supabase.from("banners").select("id", { count: "exact", head: true }),
        supabase.from("offers").select("id", { count: "exact", head: true }),
        supabase.from("enquiries").select("id, customer_name, message, created_at, status").order("created_at", { ascending: false }).limit(5),
      ]);
      setStats({
        enquiries: enq.count ?? 0,
        newEnquiries: newEnq.count ?? 0,
        products: products.count ?? 0,
        categories: categories.count ?? 0,
        testimonials: testimonials.count ?? 0,
        banners: banners.count ?? 0,
        offers: offers.count ?? 0,
      });
      if (recentEnq.data) setRecent(recentEnq.data);
    };
    load();
  }, []);

  const cards = [
    { label: "New Enquiries", value: stats?.newEnquiries ?? "—", icon: MessageSquare, accent: "text-whatsapp" },
    { label: "Total Enquiries", value: stats?.enquiries ?? "—", icon: MessageSquare, accent: "text-primary" },
    { label: "Products", value: stats?.products ?? "—", icon: Package, accent: "text-primary" },
    { label: "Categories", value: stats?.categories ?? "—", icon: Layers, accent: "text-primary" },
    { label: "Testimonials", value: stats?.testimonials ?? "—", icon: Star, accent: "text-warm" },
    { label: "Banners", value: stats?.banners ?? "—", icon: ImageIcon, accent: "text-primary" },
    { label: "Offers", value: stats?.offers ?? "—", icon: Tag, accent: "text-destructive" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-3xl font-bold">Welcome back</h2>
        <p className="text-sm text-muted-foreground">Here's what's happening with your store today.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Card key={c.label}>
            <CardContent className="flex items-center gap-4 p-5">
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-secondary ${c.accent}`}>
                <c.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{c.label}</p>
                <p className="text-2xl font-bold">{c.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Enquiries</CardTitle>
        </CardHeader>
        <CardContent>
          {recent.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">No enquiries yet.</p>
          ) : (
            <div className="space-y-3">
              {recent.map((e) => (
                <div key={e.id} className="flex items-start justify-between border-b pb-3 last:border-0">
                  <div>
                    <p className="font-medium">{e.customer_name || "Anonymous"}</p>
                    <p className="line-clamp-1 text-sm text-muted-foreground">{e.message || "—"}</p>
                  </div>
                  <div className="text-right">
                    <span className={`rounded-full px-2 py-0.5 text-xs ${e.status === "new" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                      {e.status}
                    </span>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {new Date(e.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
