import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface GalleryImage {
  id: string;
  image_url: string;
  caption: string | null;
}

export function GallerySection() {
  const [images, setImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    supabase
      .from("gallery_images")
      .select("*")
      .eq("is_active", true)
      .order("sort_order")
      .then(({ data }) => {
        if (data) setImages(data);
      });
  }, []);

  if (images.length === 0) return null;

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {images.map((img) => (
            <div key={img.id} className="group aspect-square overflow-hidden rounded-2xl">
              <img
                src={img.image_url}
                alt={img.caption || "Gallery image"}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
