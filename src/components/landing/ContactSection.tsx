import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Phone, MapPin } from "lucide-react";

const WHATSAPP_NUMBER = "919745358126";

export function ContactSection() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hi DreamRest! I'm ${name || "a customer"}.\n\n${message || "I'd like to know more about your mattresses."}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
  };

  return (
    <section id="contact" className="bg-secondary py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">
            Connect With Us
          </h2>
          <p className="mt-3 text-muted-foreground">
            Have questions? Reach out to us directly on WhatsApp
          </p>
        </div>
        <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground">
                <Phone size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Phone / WhatsApp</h3>
                <p className="text-sm text-muted-foreground">+91 97453 58126</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy text-navy-foreground">
                <MapPin size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Visit Our Store</h3>
                <p className="text-sm text-muted-foreground">Find us at your nearest location</p>
              </div>
            </div>
            <div className="mt-4 rounded-xl bg-navy p-6 text-navy-foreground">
              <p className="font-display text-lg font-bold">Still Have Questions?</p>
              <p className="mt-1 text-sm text-white/70">Our Sleep Geniuses Are Here To Help.</p>
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
