import { useEffect, useMemo, useState } from "react";

type CampaignConfig = {
  enabled: boolean;
  start?: string;
  end?: string;
  name?: string;
};

export function useCampaignFlag(key: string) {
  const [config, setConfig] = useState<CampaignConfig | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/src/app/marketing/campaigns.json");
        const json = await res.json();
        setConfig(json[key] ?? null);
      } catch (e) {
        setConfig(null);
      }
    }

    load();
  }, [key]);

  const active = useMemo(() => {
    if (!config || !config.enabled) return false;
    const now = new Date();
    if (config.start && new Date(config.start) > now) return false;
    if (config.end && new Date(config.end) < now) return false;
    return true;
  }, [config]);

  return { config, active };
}
