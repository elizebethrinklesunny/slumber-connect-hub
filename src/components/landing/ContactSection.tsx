import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Phone, MapPin, Mail } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export function ContactSection() {
  const { settings } = useSiteSettings();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleWhatsApp = () => {
    const num = settings.whatsapp_number || "919745358126";
    const text = encodeURIComponent(
      `Hi DreamRest! I'm ${name || "a customer"}.\n\n${message || "I'd like to know more about your mattresses."}`
    );
    window.open(`https://wa.me/${num}?text=${text}`, "_blank");
  };

  return (
    <section id="contact" className="bg-secondary/50 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <Badge variant="secondary" className="mb-3 text-xs uppercase tracking-widest">
            Get In Touch
          </Badge>
          <h2 className="font-display text-4xl font-bold text-foreground">
            Connect With Us
          </h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Have questions? Reach out to us directly on WhatsApp
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground">
                <Phone size={20} />
              </div>
              <div>
                <h3 className="font-semibold">Phone / WhatsApp</h3>
                <p className="text-sm text-muted-foreground">{settings.contact_phone || "+91 9745358126"}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Mail size={20} />
              </div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-sm text-muted-foreground">{settings.contact_email || "hello@dreamrest.com"}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy text-navy-foreground">
                <MapPin size={20} />
              </div>
              <div>
                <h3 className="font-semibold">Visit Our Store</h3>
                <p className="text-sm text-muted-foreground">{settings.contact_address || "Kerala, India"}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-2xl bg-card p-6 shadow-lg">
            <Input
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Textarea
              placeholder="Your message or inquiry..."
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              onClick={handleWhatsApp}
              className="w-full gap-2 bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90"
              size="lg"
            >
              <MessageCircle size={20} />
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
