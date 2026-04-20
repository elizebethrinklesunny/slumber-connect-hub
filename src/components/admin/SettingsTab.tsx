import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface SettingDef {
  key: string;
  label: string;
  type: "text" | "textarea" | "switch";
  helper?: string;
}

const SETTINGS: SettingDef[] = [
  { key: "promo_bar_active", label: "Show top promo bar", type: "switch" },
  { key: "promo_bar_text", label: "Top promo bar text", type: "text" },
  { key: "whatsapp_number", label: "WhatsApp number (with country code, no +)", type: "text", helper: "Example: 919745358126" },
  { key: "contact_phone", label: "Display phone", type: "text" },
  { key: "contact_email", label: "Contact email", type: "text" },
  { key: "contact_address", label: "Address", type: "text" },
  { key: "super_sale_active", label: "Show super sale banner", type: "switch" },
  { key: "super_sale_title", label: "Super sale title", type: "text" },
  { key: "super_sale_subtitle", label: "Super sale subtitle", type: "text" },
  { key: "super_sale_cta", label: "Super sale button text", type: "text" },
  { key: "newsletter_title", label: "Newsletter title", type: "text" },
  { key: "newsletter_subtitle", label: "Newsletter subtitle", type: "textarea" },
];

export function SettingsTab() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase
      .from("site_settings")
      .select("key,value")
      .then(({ data }) => {
        if (data) {
          const map: Record<string, string> = {};
          data.forEach((r) => { map[r.key] = r.value || ""; });
          setValues(map);
        }
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const rows = SETTINGS.map((s) => ({
      key: s.key,
      value: values[s.key] ?? "",
      updated_at: new Date().toISOString(),
    }));
    const { error } = await supabase.from("site_settings").upsert(rows, { onConflict: "key" });
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Settings saved!");
  };

  if (loading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Site Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {SETTINGS.map((s) => (
          <div key={s.key} className="space-y-1">
            <Label>{s.label}</Label>
            {s.type === "switch" ? (
              <div>
                <Switch
                  checked={values[s.key] === "true"}
                  onCheckedChange={(v) => setValues((vs) => ({ ...vs, [s.key]: v ? "true" : "false" }))}
                />
              </div>
            ) : s.type === "textarea" ? (
              <Textarea
                value={values[s.key] || ""}
                onChange={(e) => setValues((vs) => ({ ...vs, [s.key]: e.target.value }))}
              />
            ) : (
              <Input
                value={values[s.key] || ""}
                onChange={(e) => setValues((vs) => ({ ...vs, [s.key]: e.target.value }))}
              />
            )}
            {s.helper && <p className="text-xs text-muted-foreground">{s.helper}</p>}
          </div>
        ))}
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Settings"}
        </Button>
      </CardContent>
    </Card>
  );
}
