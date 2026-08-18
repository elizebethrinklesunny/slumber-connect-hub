import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

/* ── Shared types ──────────────────────────────────────────────────── */

export interface Banner {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string | null;
  cta_text: string | null;
  cta_link: string | null;
}

export interface Offer {
  id: string;
  title: string;
  description: string | null;
  discount_percentage: number | null;
  image_url: string | null;
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  original_price: number | null;
  image_url: string | null;
  pdf_url: string | null;
  category: string;
  rating: number | null;
  badge: string | null;
}

export interface Deal {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  price: number | null;
  original_price: number | null;
  ends_at: string | null;
}

export interface Testimonial {
  id: string;
  customer_name: string;
  rating: number;
  review_text: string;
  customer_image_url: string | null;
}

export interface GalleryImage {
  id: string;
  image_url: string;
  caption: string | null;
}

/* ── Context shape ─────────────────────────────────────────────────── */

interface LandingData {
  banners: Banner[];
  offers: Offer[];
  categories: Category[];
  products: Product[];
  deal: Deal | null;
  testimonials: Testimonial[];
  gallery: GalleryImage[];
  settings: Record<string, string>;
  loading: boolean;
}

const LandingDataContext = createContext<LandingData>({
  banners: [],
  offers: [],
  categories: [],
  products: [],
  deal: null,
  testimonials: [],
  gallery: [],
  settings: {},
  loading: true,
});

/* ── Provider ──────────────────────────────────────────────────────── */

export function LandingDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Omit<LandingData, "loading">>({
    banners: [],
    offers: [],
    categories: [],
    products: [],
    deal: null,
    testimonials: [],
    gallery: [],
    settings: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fire all queries in parallel — one round-trip per query but all at once,
    // instead of 8 sequential waterfalls triggered by individual useEffects.
    Promise.all([
      supabase.from("banners").select("id,title,subtitle,image_url,cta_text,cta_link").eq("is_active", true).order("sort_order"),
      supabase.from("offers").select("id,title,description,discount_percentage,image_url").eq("is_active", true).order("sort_order"),
      supabase.from("categories").select("id,name,description,image_url").eq("is_active", true).order("sort_order"),
      supabase.from("products").select("id,name,description,price,original_price,image_url,pdf_url,category,rating,badge").eq("is_active", true).order("sort_order"),
      supabase.from("deals").select("id,title,description,image_url,price,original_price,ends_at").eq("is_active", true).order("sort_order").limit(1),
      supabase.from("testimonials").select("id,customer_name,rating,review_text,customer_image_url").eq("is_active", true).order("sort_order"),
      supabase.from("gallery_images").select("id,image_url,caption").eq("is_active", true).order("sort_order"),
      supabase.from("site_settings").select("key,value"),
    ]).then(([bannersRes, offersRes, categoriesRes, productsRes, dealsRes, testimonialsRes, galleryRes, settingsRes]) => {
      const settingsMap: Record<string, string> = {};
      settingsRes.data?.forEach((row) => {
        if (row.value !== null) settingsMap[row.key] = row.value;
      });

      setData({
        banners: (bannersRes.data as Banner[]) ?? [],
        offers: (offersRes.data as Offer[]) ?? [],
        categories: (categoriesRes.data as Category[]) ?? [],
        products: (productsRes.data as Product[]) ?? [],
        deal: dealsRes.data && dealsRes.data.length > 0 ? (dealsRes.data[0] as Deal) : null,
        testimonials: (testimonialsRes.data as Testimonial[]) ?? [],
        gallery: (galleryRes.data as GalleryImage[]) ?? [],
        settings: settingsMap,
      });
      setLoading(false);
    });
  }, []);

  return (
    <LandingDataContext.Provider value={{ ...data, loading }}>
      {children}
    </LandingDataContext.Provider>
  );
}

/* ── Hook ──────────────────────────────────────────────────────────── */

export function useLandingData() {
  return useContext(LandingDataContext);
}
