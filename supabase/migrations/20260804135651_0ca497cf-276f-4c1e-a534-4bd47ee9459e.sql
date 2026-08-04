-- 1. Restrict public reads on site_settings to an explicit allowlist of public keys
DROP POLICY IF EXISTS "Anyone can view site settings" ON public.site_settings;

CREATE POLICY "Public can view public site settings"
ON public.site_settings
FOR SELECT
TO anon, authenticated
USING (
  key IN (
    'promo_bar_text',
    'promo_bar_active',
    'whatsapp_number',
    'contact_phone',
    'contact_email',
    'contact_address',
    'super_sale_title',
    'super_sale_subtitle',
    'super_sale_cta',
    'super_sale_active',
    'newsletter_title',
    'newsletter_subtitle'
  )
);

CREATE POLICY "Admins can view all site settings"
ON public.site_settings
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 2. Lock down SECURITY DEFINER functions
REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

REVOKE ALL ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
-- authenticated must keep EXECUTE: RLS policies evaluate has_role() as the calling role
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;