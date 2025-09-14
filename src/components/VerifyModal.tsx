"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Dialog } from "@/components/ui/dialog";

export function VerifyModal() {
  const search = useSearchParams();
  const shouldOpen = (search?.get("verify") ?? "") === "1";
  const [open, setOpen] = React.useState(shouldOpen);
  React.useEffect(() => setOpen(shouldOpen), [shouldOpen]);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      title="E-postanı doğrula"
      description="Hesabını etkinleştirmek için e-postanı kontrol et ve doğrulama bağlantısına tıkla."
    >
      <div className="space-y-3 text-sm">
        <p>
          Doğrulama e-postası gelmediyse <strong>Spam</strong> klasörünü kontrol et veya birkaç
          dakika sonra yeniden dene.
        </p>
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-neutral-900 px-3 py-2 text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white"
          onClick={() => setOpen(false)}
        >
          Anladım
        </button>
      </div>
    </Dialog>
  );
}
