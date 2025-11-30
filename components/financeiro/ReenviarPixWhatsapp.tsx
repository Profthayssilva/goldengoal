"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export function ReenviarPixWhatsapp({
  numero,
  nomeResponsavel,
  nomeAluno,
  descricao,
  valor,
  vencimento,
  pixPayload,
}: {
  numero: string;
  nomeResponsavel: string;
  nomeAluno?: string;
  descricao: string;
  valor: string;
  vencimento: string;
  pixPayload?: string | null;
}) {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);

  async function enviar() {
    if (!numero) {
      alert("Responsável não possui telefone cadastrado.");
      return;
    }

    setLoading(true);
    setOk(false);

    const mensagem = `
Olá ${nomeResponsavel}!

Segue novamente os dados da cobrança:

📌 ${descricao}
👦 Aluno: ${nomeAluno ?? "—"}
💰 Valor: ${valor}
📅 Vencimento: ${vencimento}

🔗 Código PIX:
${pixPayload ?? "Acesse o portal para visualizar."}

Qualquer dúvida estamos à disposição!
  `.trim();

    try {
      const res = await fetch("/api/whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ numero, mensagem }),
      });

      if (res.ok) setOk(true);
    } catch (e) {
      console.error(e);
    }

    setLoading(false);
    setTimeout(() => setOk(false), 2000);
  }

  return (
    <Button
      size="sm"
      variant="primary"
      onClick={enviar}
      disabled={loading}
      className="flex items-center gap-1"
    >
      {loading ? "Enviando..." : ok ? "Enviado!" : <><Send className="h-3 w-3" /> Reenviar PIX</>}
    </Button>
  );
}
