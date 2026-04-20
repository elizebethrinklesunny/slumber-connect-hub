import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Trash2, Plus, LogOut } from "lucide-react";
import { SettingsTab } from "@/components/admin/SettingsTab";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [{ title: "Admin Dashboard — DreamRest" }],
  }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate({ to: "/admin" }); return; }
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin");

      if (!roles || roles.length === 0) {
        await supabase.auth.signOut();
        navigate({ to: "/admin" });
        return;
      }
      setAuthenticated(true);
      setLoading(false);
    };
    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/admin" });
  };

  if (loading || !authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="border-b bg-background px-4 py-3">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h1 className="font-display text-xl font-bold text-primary">DreamRest Admin</h1>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut size={16} className="mr-2" /> Logout
          </Button>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8">
        <Tabs defaultValue="banners">
          <TabsList className="mb-6 flex w-full flex-wrap justify-start gap-1 h-auto">
            <TabsTrigger value="banners">Banners</TabsTrigger>
            <TabsTrigger value="offers">Offers</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="deals">Deals</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="trust_badges">Trust Badges</TabsTrigger>
            <TabsTrigger value="gallery_images">Gallery</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="banners"><CrudSection table="banners" fields={bannerFields} /></TabsContent>
          <TabsContent value="offers"><CrudSection table="offers" fields={offerFields} /></TabsContent>
          <TabsContent value="categories"><CrudSection table="categories" fields={categoryFields} /></TabsContent>
          <TabsContent value="products"><CrudSection table="products" fields={productFields} /></TabsContent>
          <TabsContent value="deals"><CrudSection table="deals" fields={dealFields} /></TabsContent>
          <TabsContent value="testimonials"><CrudSection table="testimonials" fields={testimonialFields} /></TabsContent>
          <TabsContent value="trust_badges"><CrudSection table="trust_badges" fields={trustBadgeFields} /></TabsContent>
          <TabsContent value="gallery_images"><CrudSection table="gallery_images" fields={galleryFields} /></TabsContent>
          <TabsContent value="settings"><SettingsTab /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

interface FieldDef {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "url" | "switch" | "datetime";
  required?: boolean;
  defaultValue?: string | number | boolean;
}

const bannerFields: FieldDef[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "subtitle", label: "Subtitle", type: "text" },
  { name: "image_url", label: "Image URL", type: "url" },
  { name: "cta_text", label: "Button Text", type: "text", defaultValue: "Shop Now" },
  { name: "cta_link", label: "Button Link", type: "url" },
  { name: "sort_order", label: "Sort Order", type: "number", defaultValue: 0 },
  { name: "is_active", label: "Active", type: "switch", defaultValue: true },
];

const offerFields: FieldDef[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea" },
  { name: "discount_percentage", label: "Discount %", type: "number" },
  { name: "image_url", label: "Image URL", type: "url" },
  { name: "sort_order", label: "Sort Order", type: "number", defaultValue: 0 },
  { name: "is_active", label: "Active", type: "switch", defaultValue: true },
];

const categoryFields: FieldDef[] = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea" },
  { name: "image_url", label: "Image URL", type: "url" },
  { name: "sort_order", label: "Sort Order", type: "number", defaultValue: 0 },
  { name: "is_active", label: "Active", type: "switch", defaultValue: true },
];

const productFields: FieldDef[] = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea" },
  { name: "price", label: "Price (₹)", type: "number" },
  { name: "original_price", label: "Original Price (₹)", type: "number" },
  { name: "image_url", label: "Image URL", type: "url" },
  { name: "category", label: "Category (e.g. mattresses, pillows, bedding)", type: "text", defaultValue: "mattresses" },
  { name: "rating", label: "Rating (0-5)", type: "number", defaultValue: 5 },
  { name: "badge", label: "Badge (e.g. Best Seller, New, Sale)", type: "text" },
  { name: "sort_order", label: "Sort Order", type: "number", defaultValue: 0 },
  { name: "is_active", label: "Active", type: "switch", defaultValue: true },
];

const dealFields: FieldDef[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea" },
  { name: "image_url", label: "Image URL", type: "url" },
  { name: "price", label: "Sale Price (₹)", type: "number" },
  { name: "original_price", label: "Original Price (₹)", type: "number" },
  { name: "ends_at", label: "Countdown End Date/Time", type: "datetime" },
  { name: "sort_order", label: "Sort Order", type: "number", defaultValue: 0 },
  { name: "is_active", label: "Active", type: "switch", defaultValue: true },
];

const testimonialFields: FieldDef[] = [
  { name: "customer_name", label: "Customer Name", type: "text", required: true },
  { name: "rating", label: "Rating (1-5)", type: "number", required: true, defaultValue: 5 },
  { name: "review_text", label: "Review", type: "textarea", required: true },
  { name: "customer_image_url", label: "Customer Photo URL", type: "url" },
  { name: "sort_order", label: "Sort Order", type: "number", defaultValue: 0 },
  { name: "is_active", label: "Active", type: "switch", defaultValue: true },
];

const trustBadgeFields: FieldDef[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "subtitle", label: "Subtitle", type: "text" },
  { name: "icon", label: "Icon (BedDouble, Truck, ShieldCheck, CreditCard, Award, Clock, RefreshCw, Headphones)", type: "text", defaultValue: "ShieldCheck" },
  { name: "sort_order", label: "Sort Order", type: "number", defaultValue: 0 },
  { name: "is_active", label: "Active", type: "switch", defaultValue: true },
];

const galleryFields: FieldDef[] = [
  { name: "image_url", label: "Image URL", type: "url", required: true },
  { name: "caption", label: "Caption", type: "text" },
  { name: "sort_order", label: "Sort Order", type: "number", defaultValue: 0 },
  { name: "is_active", label: "Active", type: "switch", defaultValue: true },
];

type TableName = "banners" | "offers" | "categories" | "products" | "deals" | "testimonials" | "trust_badges" | "gallery_images";

function CrudSection({ table, fields }: { table: TableName; fields: FieldDef[] }) {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>({});

  const loadItems = async () => {
    const { data } = await supabase.from(table).select("*").order("sort_order");
    if (data) setItems(data);
  };

  useEffect(() => {
    loadItems();
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
    // strip empty strings for optional fields, convert empty datetime to null
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
    // Format datetime-local
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold capitalize">{table.replace("_", " ")}</h2>
        <Button
          onClick={() => { resetForm(); setShowForm(true); }}
          size="sm"
        >
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
