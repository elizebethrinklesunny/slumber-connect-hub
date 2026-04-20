import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useSiteSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    supabase
      .from("site_settings")
      .select("key,value")
      .then(({ data }) => {
        if (data) {
          const map: Record<string, string> = {};
          data.forEach((row) => {
            if (row.value !== null) map[row.key] = row.value;
          });
          setSettings(map);
        }
        setLoaded(true);
      });
  }, []);

  return { settings, loaded };
}
