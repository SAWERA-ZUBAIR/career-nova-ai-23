import { useEffect } from "react";

// English-only. Kept as a passthrough so existing call sites (`const { t } = useT(); t("Home")`)
// continue to work without changes.
export function useT() {
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = "en";
    }
  }, []);

  const t = (key: string): string => key;
  return { t, lang: "English" as const };
}
