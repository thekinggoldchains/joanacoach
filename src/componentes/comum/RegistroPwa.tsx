"use client";

import { useEffect } from "react";

export function RegistroPwa() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Silencioso em ambiente de testes ou desenvolvimento sem HTTPS
      });
    }
  }, []);

  return null;
}
