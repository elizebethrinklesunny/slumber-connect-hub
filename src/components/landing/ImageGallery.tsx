const images = [
  "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80",
  "https://images.unsplash.com/photo-1616627561839-074385245ff6?w=400&q=80",
  "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&q=80",
  "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=400&q=80",
  "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&q=80",
];

export function ImageGallery() {
  return (
    <section className="overflow-hidden py-4">
      <div className="flex gap-2">
        {images.map((src, i) => (
          <div key={i} className="h-48 w-48 shrink-0 overflow-hidden md:h-64 md:w-64">
            <img
              src={src}
              alt={`Gallery ${i + 1}`}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
