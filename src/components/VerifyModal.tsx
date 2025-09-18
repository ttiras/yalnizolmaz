"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
        <Button type="button" onClick={() => setOpen(false)}>
          Anladım
        </Button>
      </div>
    </Dialog>
  );
}
