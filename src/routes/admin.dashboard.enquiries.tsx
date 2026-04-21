import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, MessageCircle, Phone } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/dashboard/enquiries")({
  head: () => ({ meta: [{ title: "Enquiries — DreamRest Admin" }] }),
  component: EnquiriesPage,
});

interface Enquiry {
  id: string;
  customer_name: string | null;
  message: string | null;
  phone: string | null;
  source: string | null;
  status: string;
  created_at: string;
}

function EnquiriesPage() {
  const [items, setItems] = useState<Enquiry[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    let query = supabase.from("enquiries").select("*").order("created_at", { ascending: false });
    if (filter !== "all") query = query.eq("status", filter);
    const { data } = await query;
    if (data) setItems(data as Enquiry[]);
    setLoading(false);
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [filter]);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("enquiries").update({ status }).eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Status updated");
    load();
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("enquiries").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Enquiry deleted");
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-3xl font-bold">Enquiries</h2>
          <p className="text-sm text-muted-foreground">Customer enquiries from contact form & WhatsApp clicks.</p>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : items.length === 0 ? (
        <Card><CardContent className="py-12 text-center text-muted-foreground">No enquiries found.</CardContent></Card>
      ) : (
        <div className="space-y-3">
          {items.map((e) => (
            <Card key={e.id}>
              <CardContent className="flex flex-wrap items-start justify-between gap-4 p-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{e.customer_name || "Anonymous"}</p>
                    {e.source && <span className="rounded bg-secondary px-2 py-0.5 text-xs text-muted-foreground">{e.source}</span>}
                  </div>
                  {e.phone && (
                    <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                      <Phone size={12} /> {e.phone}
                    </p>
                  )}
                  <p className="mt-2 text-sm">{e.message || "—"}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {new Date(e.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Select value={e.status} onValueChange={(v) => updateStatus(e.id, v)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex gap-2">
                    {e.phone && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(`https://wa.me/${e.phone?.replace(/\D/g, "")}`, "_blank")}
                      >
                        <MessageCircle size={14} />
                      </Button>
                    )}
                    <Button size="sm" variant="destructive" onClick={() => remove(e.id)}>
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
