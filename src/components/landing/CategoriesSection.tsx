import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Category {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
}

export function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    supabase
      .from("categories")
      .select("*")
      .eq("is_active", true)
      .order("sort_order")
      .then(({ data }) => {
        if (data) setCategories(data);
      });
  }, []);

  if (categories.length === 0) return null;

  return (
    <section id="categories" className="bg-secondary/50 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <Badge variant="secondary" className="mb-3 text-xs uppercase tracking-widest">
            Browse
          </Badge>
          <h2 className="font-display text-4xl font-bold text-foreground">
            Our Categories
          </h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Find the perfect mattress for every sleeper
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <Card key={cat.id} className="group cursor-pointer overflow-hidden border-0 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg">
              {cat.image_url && (
                <div className="aspect-square overflow-hidden">
                  <img
                    src={cat.image_url}
                    alt={cat.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              )}
              <CardContent className="p-5 text-center">
                <h3 className="font-display text-lg font-semibold">{cat.name}</h3>
                {cat.description && (
                  <p className="mt-1 text-sm text-muted-foreground">{cat.description}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
