import { useLandingData } from "@/contexts/LandingDataContext";

export function GallerySection() {
  const { gallery } = useLandingData();

  if (gallery.length === 0) return null;

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {gallery.map((img) => (
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
