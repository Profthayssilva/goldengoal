"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export function EnviarLembreteWhatsapp({ numero, mensagem }: { numero: string, mensagem: string }) {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);

  async function enviar() {
    setLoading(true);
    setOk(false);

    try {
      const res = await fetch("/api/whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ numero, mensagem }),
      });

      if (res.ok) {
        setOk(true);
      }
    } catch (e) {
      console.error("Erro ao enviar WhatsApp:", e);
    }

    setLoading(false);
    setTimeout(() => setOk(false), 2500);
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={enviar}
      disabled={loading}
      className="flex items-center gap-2"
    >
      {loading ? "Enviando..." : ok ? "Enviado!" : <><Send className="w-4 h-4" /> WhatsApp</>}
    </Button>
  );
}
