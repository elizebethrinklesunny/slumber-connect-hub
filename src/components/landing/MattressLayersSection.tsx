import { Badge } from "@/components/ui/badge";

const LAYERS = [
  { name: "Quilted Cover", color: "bg-warm/40", desc: "Soft, breathable fabric for cool comfort" },
  { name: "Memory Foam", color: "bg-primary/40", desc: "Contours to your body for pressure relief" },
  { name: "Cooling Gel", color: "bg-navy/30", desc: "Regulates temperature throughout the night" },
  { name: "Pocket Springs", color: "bg-accent", desc: "Targeted support and motion isolation" },
  { name: "High-Density Base", color: "bg-secondary", desc: "Long-lasting structural foundation" },
];

export function MattressLayersSection() {
  return (
    <section className="bg-secondary/40 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <Badge variant="secondary" className="mb-3 text-xs uppercase tracking-widest">
              Engineered for Sleep
            </Badge>
            <h2 className="font-display text-4xl font-bold">5 Layers of Pure Comfort</h2>
            <p className="mt-4 text-muted-foreground">
              Every DreamRest mattress is crafted with five precision-engineered layers, working
              together to give you the deepest, most restorative sleep of your life.
            </p>
            <ul className="mt-6 space-y-3">
              {LAYERS.map((l, i) => (
                <li key={l.name} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold">{l.name}</p>
                    <p className="text-sm text-muted-foreground">{l.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              {LAYERS.map((l) => (
                <div
                  key={l.name}
                  className={`${l.color} flex items-center justify-center px-6 py-6 text-center text-sm font-medium`}
                >
                  {l.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
