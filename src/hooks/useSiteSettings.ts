import { useLandingData } from "@/contexts/LandingDataContext";

/**
 * Returns site settings from the shared LandingDataContext.
 * All data is fetched once via a single Promise.all in the provider —
 * no additional network requests are made here.
 */
export function useSiteSettings() {
  const { settings, loading } = useLandingData();
  return { settings, loaded: !loading };
}
