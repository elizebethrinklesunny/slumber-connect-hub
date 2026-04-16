import { Link } from "@tanstack/react-router";
import { Menu, X, Search, MapPin, User, Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      {/* Top promo bar */}
      <div className="bg-navy text-navy-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs">
          <div className="hidden items-center gap-4 md:flex">
            <span>English</span>
            <span>$ Dollar (US)</span>
          </div>
          <p className="w-full text-center md:w-auto">
            <span className="font-semibold">Cyber Monday Sale:</span> Get Up To $100 Off!{" "}
            <button onClick={() => scrollTo("offers")} className="underline">Shop Now</button>
          </p>
          <div className="hidden items-center gap-3 md:flex">
            <span className="cursor-pointer">📘</span>
            <span className="cursor-pointer">✕</span>
            <span className="cursor-pointer">📷</span>
            <span className="cursor-pointer">📌</span>
            <span className="cursor-pointer">▶️</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          {/* Left */}
          <div className="hidden items-center gap-5 md:flex">
            <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
              <MapPin size={16} /> Location
            </button>
            <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
              <Search size={16} /> Search
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo center */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold">
              <span className="font-display text-lg font-bold text-gold-foreground">S</span>
            </div>
            <span className="font-display text-2xl font-bold text-navy">DreamRest</span>
          </Link>

          {/* Right */}
          <div className="flex items-center gap-4">
            <Link to="/admin" className="hidden items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground md:flex">
              <User size={16} /> Sign In
            </Link>
            <button className="relative text-muted-foreground hover:text-foreground">
              <Heart size={20} />
              <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">0</span>
            </button>
            <button className="relative text-muted-foreground hover:text-foreground">
              <ShoppingBag size={20} />
              <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">0</span>
            </button>
          </div>
        </div>

        {/* Navigation bar */}
        <nav className="hidden border-t bg-navy md:block">
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-10 px-4 py-3">
            {[
              { label: "Home", action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
              { label: "Shop", action: () => scrollTo("categories") },
              { label: "Products", action: () => scrollTo("products") },
              { label: "Offers", action: () => scrollTo("offers") },
              { label: "Testimonials", action: () => scrollTo("testimonials") },
              { label: "Contact", action: () => scrollTo("contact") },
            ].map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className="text-sm font-medium text-white/90 transition hover:text-white"
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Mobile nav */}
        {open && (
          <div className="border-t bg-background px-4 py-4 md:hidden">
            <div className="flex flex-col gap-3">
              {["offers", "categories", "products", "testimonials", "contact"].map((s) => (
                <button
                  key={s}
                  onClick={() => scrollTo(s)}
                  className="text-left text-sm font-medium capitalize text-muted-foreground"
                >
                  {s}
                </button>
              ))}
              <Link to="/admin" className="text-sm font-medium text-muted-foreground">
                Admin Panel
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
