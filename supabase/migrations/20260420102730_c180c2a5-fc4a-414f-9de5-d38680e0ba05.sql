-- Phase 1: Add new tables for products, deals, gallery, trust badges, promo bar, settings

-- Site settings (promo bar text, contact info, super sale banner)
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admins can manage site settings" ON public.site_settings FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));

-- Products
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10,2),
  original_price NUMERIC(10,2),
  image_url TEXT,
  category TEXT NOT NULL DEFAULT 'mattresses',
  rating NUMERIC(2,1) DEFAULT 5,
  badge TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active products" ON public.products FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage products" ON public.products FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Trust badges
CREATE TABLE public.trust_badges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  icon TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.trust_badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active badges" ON public.trust_badges FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage badges" ON public.trust_badges FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_trust_badges_updated_at BEFORE UPDATE ON public.trust_badges
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Deal of the week
CREATE TABLE public.deals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  price NUMERIC(10,2),
  original_price NUMERIC(10,2),
  ends_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active deals" ON public.deals FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage deals" ON public.deals FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_deals_updated_at BEFORE UPDATE ON public.deals
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Image gallery
CREATE TABLE public.gallery_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  caption TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active gallery" ON public.gallery_images FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage gallery" ON public.gallery_images FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_gallery_updated_at BEFORE UPDATE ON public.gallery_images
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Add price/badge columns to existing tables
ALTER TABLE public.banners ADD COLUMN IF NOT EXISTS promo_text TEXT;

-- Seed default site settings
INSERT INTO public.site_settings (key, value) VALUES
  ('promo_bar_text', '🔥 MEGA SALE: Up to 60% OFF on Premium Mattresses — Free Delivery Nationwide!'),
  ('promo_bar_active', 'true'),
  ('whatsapp_number', '919745358126'),
  ('contact_phone', '+91 9745358126'),
  ('contact_email', 'hello@dreamrest.com'),
  ('contact_address', 'Kerala, India'),
  ('super_sale_title', 'SUPER SALE'),
  ('super_sale_subtitle', 'Up to 70% OFF on selected mattresses'),
  ('super_sale_cta', 'Shop Now'),
  ('super_sale_active', 'true'),
  ('newsletter_title', 'Subscribe to Our Newsletter'),
  ('newsletter_subtitle', 'Get exclusive offers & sleep tips delivered to your inbox')
ON CONFLICT (key) DO NOTHING;

-- Seed trust badges
INSERT INTO public.trust_badges (title, subtitle, icon, sort_order) VALUES
  ('120-Night Trial', 'Sleep on it risk-free', 'BedDouble', 1),
  ('Free Shipping', 'On all orders nationwide', 'Truck', 2),
  ('10-Year Warranty', 'Built to last', 'ShieldCheck', 3),
  ('Easy Financing', '0% EMI available', 'CreditCard', 4)
ON CONFLICT DO NOTHING;