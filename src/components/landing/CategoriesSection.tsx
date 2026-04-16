import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Category {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
}

const defaultCategories: Category[] = [
  { id: "1", name: "Mattresses", description: "8 items", image_url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80" },
  { id: "2", name: "Bedding", description: "13 items", image_url: "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=400&q=80" },
  { id: "3", name: "Bed Frames", description: "3 items", image_url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80" },
  { id: "4", name: "Pillows", description: "7 items", image_url: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&q=80" },
  { id: "5", name: "Accessories", description: "8 items", image_url: "https://images.unsplash.com/photo-1616627561839-074385245ff6?w=400&q=80" },
];

export function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>(defaultCategories);

  useEffect(() => {
    supabase
      .from("categories")
      .select("*")
      .eq("is_active", true)
      .order("sort_order")
      .then(({ data }) => {
        if (data && data.length > 0) setCategories(data);
      });
  }, []);

  return (
    <section id="categories" className="bg-secondary py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">
            Shop By Categories
          </h2>
          <p className="mt-3 text-muted-foreground">
            Discover the perfect items by exploring our wide range of categories.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {categories.map((cat) => (
            <div key={cat.id} className="group cursor-pointer text-center">
              <div className="mx-auto h-32 w-32 overflow-hidden rounded-full border-2 border-transparent shadow-md transition-all group-hover:border-gold group-hover:shadow-lg md:h-40 md:w-40">
                <img
                  src={cat.image_url || "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80"}
                  alt={cat.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="mt-4 font-display text-base font-bold text-navy md:text-lg">{cat.name}</h3>
              {cat.description && (
                <p className="text-xs text-muted-foreground">{cat.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
