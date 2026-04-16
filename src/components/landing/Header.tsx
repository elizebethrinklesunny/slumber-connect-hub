import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="font-display text-2xl font-bold text-primary">
          DreamRest
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {["offers", "categories", "testimonials"].map((s) => (
            <button
              key={s}
              onClick={() => scrollTo(s)}
              className="text-sm font-medium capitalize text-muted-foreground transition hover:text-foreground"
            >
              {s}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            Contact Us
          </button>
          <Link to="/admin">
            <Button variant="outline" size="sm">Admin</Button>
          </Link>
        </nav>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t bg-background px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {["offers", "categories", "testimonials"].map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                className="text-left text-sm font-medium capitalize text-muted-foreground"
              >
                {s}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="text-left text-sm font-medium text-muted-foreground"
            >
              Contact Us
            </button>
            <Link to="/admin">
              <Button variant="outline" size="sm" className="w-full">Admin</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
