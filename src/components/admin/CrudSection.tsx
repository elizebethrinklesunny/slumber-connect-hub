import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Trash2, Plus } from "lucide-react";

export interface FieldDef {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "url" | "switch" | "datetime" | "category-select";
  required?: boolean;
  defaultValue?: string | number | boolean;
}

export type TableName =
  | "banners"
  | "offers"
  | "categories"
  | "products"
  | "deals"
  | "testimonials"
  | "trust_badges"
  | "gallery_images";

export function CrudSection({
  table,
  fields,
  title,
}: {
  table: TableName;
  fields: FieldDef[];
  title?: string;
}) {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [categoryOptions, setCategoryOptions] = useState<{ id: string; name: string }[]>([]);

  const needsCategories = fields.some((f) => f.type === "category-select");

  const loadItems = async () => {
    const { data } = await supabase.from(table).select("*").order("sort_order");
    if (data) setItems(data);
  };

  const loadCategories = async () => {
    const { data } = await supabase
      .from("categories")
      .select("id, name")
      .eq("is_active", true)
      .order("sort_order");
    if (data) setCategoryOptions(data);
  };

  useEffect(() => {
    loadItems();
    if (needsCategories) loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);

  const resetForm = () => {
    const defaults: Record<string, unknown> = {};
    fields.forEach((f) => {
      if (f.defaultValue !== undefined) defaults[f.name] = f.defaultValue;
    });
    setForm(defaults);
    setEditingId(null);
    setShowForm(false);
  };

  const handleSave = async () => {
    const payload: Record<string, unknown> = { ...form };
    fields.forEach((f) => {
      if (payload[f.name] === "" || payload[f.name] === undefined) {
        payload[f.name] = null;
      }
    });
    if (editingId) {
      const { error } = await supabase.from(table).update(payload as never).eq("id", editingId);
      if (error) { toast.error(error.message); return; }
      toast.success("Updated successfully");
    } else {
      const { error } = await supabase.from(table).insert(payload as never);
      if (error) { toast.error(error.message); return; }
      toast.success("Created successfully");
    }
    resetForm();
    loadItems();
  };

  const handleEdit = (item: Record<string, unknown>) => {
    const formData: Record<string, unknown> = { ...item };
    fields.forEach((f) => {
      if (f.type === "datetime" && formData[f.name]) {
        const d = new Date(formData[f.name] as string);
        formData[f.name] = d.toISOString().slice(0, 16);
      }
    });
    setForm(formData);
    setEditingId(item.id as string);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Deleted");
    loadItems();
  };

  const titleField = fields[0].name;
  const heading = title ?? table.replace("_", " ");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold capitalize">{heading}</h2>
        <Button onClick={() => { resetForm(); setShowForm(true); }} size="sm">
          <Plus size={16} className="mr-1" /> Add New
        </Button>
      </div>

      {showForm && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg">{editingId ? "Edit" : "Add New"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {fields.map((field) => (
              <div key={field.name} className="space-y-1">
                <Label>{field.label}</Label>
                {field.type === "switch" ? (
                  <div>
                    <Switch
                      checked={!!form[field.name]}
                      onCheckedChange={(v) => setForm((f) => ({ ...f, [field.name]: v }))}
                    />
                  </div>
                ) : field.type === "textarea" ? (
                  <Textarea
                    value={(form[field.name] as string) || ""}
                    onChange={(e) => setForm((f) => ({ ...f, [field.name]: e.target.value }))}
                    required={field.required}
                  />
                ) : field.type === "category-select" ? (
                  categoryOptions.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No categories yet. Add one in the Categories tab first.
                    </p>
                  ) : (
                    <Select
                      value={(form[field.name] as string) || ""}
                      onValueChange={(v) => setForm((f) => ({ ...f, [field.name]: v }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryOptions.map((c) => (
                          <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )
                ) : (
                  <Input
                    type={field.type === "number" ? "number" : field.type === "datetime" ? "datetime-local" : "text"}
                    value={(form[field.name] as string | number) ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        [field.name]:
                          field.type === "number" ? (e.target.value === "" ? "" : Number(e.target.value)) : e.target.value,
                      }))
                    }
                    required={field.required}
                  />
                )}
              </div>
            ))}
            <div className="flex gap-2">
              <Button onClick={handleSave}>Save</Button>
              <Button variant="ghost" onClick={resetForm}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        {items.map((item) => (
          <Card key={item.id as string} className="flex items-center justify-between p-4">
            <div>
              <p className="font-semibold">{String(item[titleField] || "")}</p>
              <p className="text-xs text-muted-foreground">
                {(item as Record<string, unknown>).is_active ? "Active" : "Inactive"} · Order: {String((item as Record<string, unknown>).sort_order ?? 0)}
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>Edit</Button>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id as string)}>
                <Trash2 size={14} />
              </Button>
            </div>
          </Card>
        ))}
        {items.length === 0 && (
          <p className="py-8 text-center text-muted-foreground">No items yet. Add one above.</p>
        )}
      </div>
    </div>
  );
}

// Field defs reused across CRUD routes
export const bannerFields: FieldDef[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "subtitle", label: "Subtitle", type: "text" },
  { name: "image_url", label: "Image URL", type: "url" },
  { name: "cta_text", label: "Button Text", type: "text", defaultValue: "Shop Now" },
  { name: "cta_link", label: "Button Link", type: "url" },
  { name: "sort_order", label: "Sort Order", type: "number", defaultValue: 0 },
  { name: "is_active", label: "Active", type: "switch", defaultValue: true },
];

export const offerFields: FieldDef[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea" },
  { name: "discount_percentage", label: "Discount %", type: "number" },
  { name: "image_url", label: "Image URL", type: "url" },
  { name: "sort_order", label: "Sort Order", type: "number", defaultValue: 0 },
  { name: "is_active", label: "Active", type: "switch", defaultValue: true },
];

export const categoryFields: FieldDef[] = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea" },
  { name: "image_url", label: "Image URL", type: "url" },
  { name: "sort_order", label: "Sort Order", type: "number", defaultValue: 0 },
  { name: "is_active", label: "Active", type: "switch", defaultValue: true },
];

export const productFields: FieldDef[] = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea" },
  { name: "price", label: "Price (₹)", type: "number" },
  { name: "original_price", label: "Original Price (₹)", type: "number" },
  { name: "image_url", label: "Image URL", type: "url" },
  { name: "category", label: "Category", type: "category-select", required: true, defaultValue: "" },
  { name: "rating", label: "Rating (0-5)", type: "number", defaultValue: 5 },
  { name: "badge", label: "Badge (e.g. Best Seller, New, Sale)", type: "text" },
  { name: "sort_order", label: "Sort Order", type: "number", defaultValue: 0 },
  { name: "is_active", label: "Active", type: "switch", defaultValue: true },
];

export const dealFields: FieldDef[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea" },
  { name: "image_url", label: "Image URL", type: "url" },
  { name: "price", label: "Sale Price (₹)", type: "number" },
  { name: "original_price", label: "Original Price (₹)", type: "number" },
  { name: "ends_at", label: "Countdown End Date/Time", type: "datetime" },
  { name: "sort_order", label: "Sort Order", type: "number", defaultValue: 0 },
  { name: "is_active", label: "Active", type: "switch", defaultValue: true },
];

export const testimonialFields: FieldDef[] = [
  { name: "customer_name", label: "Customer Name", type: "text", required: true },
  { name: "rating", label: "Rating (1-5)", type: "number", required: true, defaultValue: 5 },
  { name: "review_text", label: "Review", type: "textarea", required: true },
  { name: "customer_image_url", label: "Customer Photo URL", type: "url" },
  { name: "sort_order", label: "Sort Order", type: "number", defaultValue: 0 },
  { name: "is_active", label: "Active", type: "switch", defaultValue: true },
];

export const trustBadgeFields: FieldDef[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "subtitle", label: "Subtitle", type: "text" },
  { name: "icon", label: "Icon (BedDouble, Truck, ShieldCheck, CreditCard, Award, Clock, RefreshCw, Headphones)", type: "text", defaultValue: "ShieldCheck" },
  { name: "sort_order", label: "Sort Order", type: "number", defaultValue: 0 },
  { name: "is_active", label: "Active", type: "switch", defaultValue: true },
];

export const galleryFields: FieldDef[] = [
  { name: "image_url", label: "Image URL", type: "url", required: true },
  { name: "caption", label: "Caption", type: "text" },
  { name: "sort_order", label: "Sort Order", type: "number", defaultValue: 0 },
  { name: "is_active", label: "Active", type: "switch", defaultValue: true },
];
