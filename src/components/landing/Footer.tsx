import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="border-t bg-background py-14">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold">
              <span className="font-display text-sm font-bold text-gold-foreground">S</span>
            </div>
            <span className="font-display text-xl font-bold text-navy">DreamRest</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Still Have Questions? Our Sleep Geniuses Are Here To Help.
          </p>
          <div className="mt-4 space-y-1 text-xs text-muted-foreground">
            <p className="font-semibold text-foreground">Our Address</p>
            <p>101 E 129th St, East Chicago, IN 46312, US</p>
            <p className="mt-2 font-semibold text-foreground">Support 24/7</p>
            <p>+91 97453 58126</p>
          </div>
        </div>

        {/* Shop links */}
        <div>
          <h3 className="font-display text-base font-bold text-foreground">Shop</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li className="cursor-pointer hover:text-foreground">Mattresses</li>
            <li className="cursor-pointer hover:text-foreground">Bedding</li>
            <li className="cursor-pointer hover:text-foreground">Bed Frames</li>
            <li className="cursor-pointer hover:text-foreground">Pillows</li>
            <li className="cursor-pointer hover:text-foreground">Accessories</li>
          </ul>
        </div>

        {/* Support links */}
        <div>
          <h3 className="font-display text-base font-bold text-foreground">Support</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li className="cursor-pointer hover:text-foreground">FAQs</li>
            <li className="cursor-pointer hover:text-foreground">About Us</li>
            <li className="cursor-pointer hover:text-foreground">Latest News</li>
            <li className="cursor-pointer hover:text-foreground">Track Your Order</li>
            <li className="cursor-pointer hover:text-foreground">Terms & Conditions</li>
            <li className="cursor-pointer hover:text-foreground">Returns & Exchanges</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-display text-base font-bold text-foreground">Newsletter</h3>
          <p className="mt-4 text-sm text-muted-foreground">
            Sign up for exclusive offers, original stories, events.
          </p>
          <div className="mt-4 flex gap-2">
            <Input placeholder="Enter your e-mail" className="text-sm" />
            <Button size="sm" className="bg-navy text-navy-foreground hover:bg-navy/90">
              Sign Up
            </Button>
          </div>
          <p className="mt-6 text-xs font-semibold text-foreground">Follow Us</p>
          <div className="mt-2 flex gap-3 text-muted-foreground">
            <span className="cursor-pointer hover:text-foreground">📘</span>
            <span className="cursor-pointer hover:text-foreground">✕</span>
            <span className="cursor-pointer hover:text-foreground">📷</span>
            <span className="cursor-pointer hover:text-foreground">📌</span>
            <span className="cursor-pointer hover:text-foreground">▶️</span>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t px-4 pt-6">
        <p className="text-center text-xs text-muted-foreground">
          ©{new Date().getFullYear()} DreamRest Company, LLC. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
