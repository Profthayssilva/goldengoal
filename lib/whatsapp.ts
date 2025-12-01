// /lib/whatsapp.ts

/**
 * Envia mensagem WhatsApp via Meta Cloud API
 * Formato profissional, com fallback e suporte a PIX/Boleto.
 */

export async function enviarWhatsCobrancaMetaCloud(
  telefone: string,
  aluno: string,
  valor: number,
  vencimento: string,
  linkPagamento?: string
) {
  try {
    // ------------------------------
    // Sanitização do telefone
    // ------------------------------
    const phone = telefone.replace(/\D/g, "");
    const fullPhone = phone.length === 11 ? `55${phone}` : phone; // +55 automático

    // ------------------------------
    // Mensagem fallback em texto
    // ------------------------------
    const mensagemSimples =
      `📢 *Nova cobrança disponível!*\n\n` +
      `👤 *Aluno:* ${aluno}\n` +
      `💰 *Valor:* R$ ${valor.toFixed(2)}\n` +
      `📅 *Vencimento:* ${vencimento}\n\n` +
      (linkPagamento ? `🔗 *Pagamento:* ${linkPagamento}\n\n` : "") +
      `🏫 *Escola de Fut7 Golden Goal*`;

    // ------------------------------
    // Template com BOTÕES (Meta Cloud)
    // ------------------------------
    // Para ativar, crie um template no WhatsApp Business Manager
    // e coloque o nome aqui:
    const templateName = process.env.META_TEMPLATE_COBRANCA; // ex: "cobranca_fut7"

    if (templateName) {
      try {
        const templatePayload = {
          messaging_product: "whatsapp",
          to: fullPhone,
          type: "template",
          template: {
            name: templateName,
            language: { code: "pt_BR" },
            components: [
              {
                type: "body",
                parameters: [
                  { type: "text", text: aluno },
                  { type: "text", text: valor.toFixed(2) },
                  { type: "text", text: vencimento },
                ],
              },
              ...(linkPagamento
                ? [
                    {
                      type: "button",
                      sub_type: "url",
                      index: "0",
                      parameters: [{ type: "text", text: linkPagamento }],
                    },
                  ]
                : []),
            ],
          },
        };

        const templateRes = await fetch(
          `https://graph.facebook.com/v19.0/${process.env.META_PHONE_ID}/messages`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.META_ACCESS_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(templatePayload),
          }
        );

        const json = await templateRes.json();
        if (!templateRes.ok || json.error) {
          console.error("Erro envio template Meta:", json);
          throw new Error("Erro template");
        }

        return { ok: true, via: "template" };
      } catch (err) {
        console.warn("⚠️ Template falhou, usando fallback simples...");
      }
    }

    // ------------------------------
    // Fallback simples em texto
    // ------------------------------
    await fetch(
      `https://graph.facebook.com/v19.0/${process.env.META_PHONE_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.META_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: fullPhone,
          type: "text",
          text: { body: mensagemSimples },
        }),
      }
    );

    return { ok: true, via: "texto" };
  } catch (err) {
    console.error("❌ Erro ao enviar WhatsApp:", err);
    return { ok: false, error: "Erro ao enviar WhatsApp" };
  }
}
