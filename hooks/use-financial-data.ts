"use client";

import { useCallback, useEffect, useState } from "react";
import type { FinancialData } from "@/lib/financial-data";

const REFRESH_INTERVAL = 10_000;

export function useFinancialData() {
  const [data, setData] = useState<FinancialData | null>(null);

  const refresh = useCallback(async (signal?: AbortSignal) => {
    try {
      const response = await fetch("/api/financial-data", { cache: "no-store", signal });
      if (!response.ok) return;
      setData(await response.json() as FinancialData);
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError")) {
        console.warn("No se pudieron actualizar los datos financieros.");
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void refresh(controller.signal);

    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") void refresh();
    }, REFRESH_INTERVAL);
    const handleVisibility = () => {
      if (document.visibilityState === "visible") void refresh();
    };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("focus", handleVisibility);
    return () => {
      controller.abort();
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("focus", handleVisibility);
    };
  }, [refresh]);

  return data;
}

