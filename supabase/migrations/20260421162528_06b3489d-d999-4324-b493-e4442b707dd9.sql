CREATE TABLE public.enquiries (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name text,
  message text,
  phone text,
  source text,
  product_id uuid,
  status text NOT NULL DEFAULT 'new',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit enquiries"
ON public.enquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins can view all enquiries"
ON public.enquiries
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update enquiries"
ON public.enquiries
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete enquiries"
ON public.enquiries
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_enquiries_updated_at
BEFORE UPDATE ON public.enquiries
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_enquiries_created_at ON public.enquiries(created_at DESC);
CREATE INDEX idx_enquiries_status ON public.enquiries(status);