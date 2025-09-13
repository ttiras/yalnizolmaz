"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";

export function VerifyBanner() {
  const search = useSearchParams();
  const show = (search?.get("verify") ?? "") === "1";
  if (!show) return null;

  return (
    <div
      role="alert"
      className="mx-auto mb-4 max-w-3xl rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900"
    >
      E-postanı doğrula. Gelen kutunu kontrol et ve doğrulama bağlantısına tıkla.
    </div>
  );
}
