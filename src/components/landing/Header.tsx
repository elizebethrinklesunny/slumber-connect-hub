import { Link } from "@tanstack/react-router";
import { Menu, X, Search, MapPin, User, Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NAV_LINKS = [
  { label: "Home", id: "top" },
  { label: "Mattresses", id: "products" },
  { label: "Categories", id: "categories" },
  { label: "Offers", id: "offers" },
  { label: "Deals", id: "deal" },
  { label: "Reviews", id: "testimonials" },
  { label: "Contact", id: "contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background shadow-sm">
      {/* Top utility row */}
      <div className="border-b">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="font-display text-2xl font-bold text-primary md:text-3xl">
            Elora
          </Link>

          <div className="hidden flex-1 max-w-xl md:block">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search mattresses, pillows, bedding..."
                className="pl-9"
              />
            </div>
          </div>

          <div className="flex items-center gap-1 md:gap-3">
            <button
              className="hidden items-center gap-1 text-xs text-muted-foreground transition hover:text-foreground md:flex"
              onClick={() => scrollTo("contact")}
            >
              <MapPin size={16} /> <span>Store</span>
            </button>
            <Link to="/admin" className="hidden md:block">
              <button className="flex items-center gap-1 text-xs text-muted-foreground transition hover:text-foreground">
                <User size={16} /> <span>Sign In</span>
              </button>
            </Link>
            <button className="hidden p-2 text-muted-foreground hover:text-primary md:block" aria-label="Wishlist">
              <Heart size={18} />
            </button>
            <button className="relative p-2 text-muted-foreground hover:text-primary" aria-label="Cart">
              <ShoppingCart size={18} />
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">0</span>
            </button>
            <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Navy nav bar */}
      <nav className="hidden bg-navy text-navy-foreground md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="px-4 py-3 text-sm font-medium uppercase tracking-wide transition hover:bg-white/10"
              >
                {l.label}
              </button>
            ))}
            <Link
              to="/products"
              className="px-4 py-3 text-sm font-medium uppercase tracking-wide transition hover:bg-white/10"
            >
              All Products
            </Link>
          </div>
          <Link to="/admin">
            <Button size="sm" variant="ghost" className="text-navy-foreground hover:bg-white/10 hover:text-navy-foreground">
              Admin
            </Button>
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t bg-background px-4 py-4 md:hidden">
          <div className="mb-4 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-9" />
          </div>
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="rounded px-3 py-2 text-left text-sm font-medium hover:bg-secondary"
              >
                {l.label}
              </button>
            ))}
            <Link to="/products" onClick={() => setOpen(false)} className="rounded px-3 py-2 text-sm font-medium hover:bg-secondary">
              All Products
            </Link>
            <Link to="/admin" className="mt-2">
              <Button variant="outline" size="sm" className="w-full">Admin Panel</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
