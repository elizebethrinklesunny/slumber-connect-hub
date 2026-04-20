import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { toast } from "sonner";

export function Footer() {
  const { settings } = useSiteSettings();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Thanks for subscribing! We'll keep you posted.");
    setEmail("");
  };

  return (
    <footer className="bg-navy text-navy-foreground">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 md:grid-cols-2 md:items-center">
          <div>
            <h3 className="font-display text-2xl font-bold">
              {settings.newsletter_title || "Subscribe to Our Newsletter"}
            </h3>
            <p className="mt-2 text-sm opacity-80">
              {settings.newsletter_subtitle || "Get exclusive offers & sleep tips delivered to your inbox"}
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="bg-white/10 text-navy-foreground placeholder:text-white/60 border-white/20"
            />
            <Button type="submit" className="bg-gold text-navy hover:bg-gold/90">Subscribe</Button>
          </form>
        </div>
      </div>

      {/* Main grid */}
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-4">
        <div>
          <p className="font-display text-2xl font-bold">DreamRest</p>
          <p className="mt-3 text-sm opacity-80">
            Premium mattresses crafted for the perfect night's sleep. Trusted by thousands of happy sleepers.
          </p>
          <div className="mt-4 flex gap-3">
            <a href="#" aria-label="Facebook" className="rounded-full bg-white/10 p-2 hover:bg-white/20"><Facebook size={16} /></a>
            <a href="#" aria-label="Instagram" className="rounded-full bg-white/10 p-2 hover:bg-white/20"><Instagram size={16} /></a>
            <a href="#" aria-label="Twitter" className="rounded-full bg-white/10 p-2 hover:bg-white/20"><Twitter size={16} /></a>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold">Shop</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><a href="#products" className="hover:text-gold">Mattresses</a></li>
            <li><a href="#products" className="hover:text-gold">Pillows</a></li>
            <li><a href="#products" className="hover:text-gold">Bedding</a></li>
            <li><a href="#offers" className="hover:text-gold">Offers</a></li>
            <li><a href="#deal" className="hover:text-gold">Deals</a></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold">Support</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><a href="#contact" className="hover:text-gold">Contact Us</a></li>
            <li><a href="#" className="hover:text-gold">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-gold">120-Night Trial</a></li>
            <li><a href="#" className="hover:text-gold">Warranty</a></li>
            <li><a href="#" className="hover:text-gold">FAQs</a></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold">Get In Touch</h4>
          <ul className="space-y-3 text-sm opacity-80">
            <li className="flex items-center gap-2"><Phone size={14} /> {settings.contact_phone || "+91 9745358126"}</li>
            <li className="flex items-center gap-2"><Mail size={14} /> {settings.contact_email || "hello@dreamrest.com"}</li>
            <li className="flex items-center gap-2"><MapPin size={14} /> {settings.contact_address || "Kerala, India"}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs opacity-70 md:flex-row">
          <p>© {new Date().getFullYear()} DreamRest. All rights reserved.</p>
          <p>Premium mattresses — designed in India.</p>
        </div>
      </div>
    </footer>
  );
}
