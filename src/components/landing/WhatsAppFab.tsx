import { MessageCircle } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export function WhatsAppFab() {
  const { settings } = useSiteSettings();
  const handleClick = () => {
    const num = settings.whatsapp_number || "919745358126";
    const text = encodeURIComponent("Hi DreamRest! I'd like to know more about your mattresses.");
    window.open(`https://wa.me/${num}?text=${text}`, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lg transition-transform hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} />
    </button>
  );
}
