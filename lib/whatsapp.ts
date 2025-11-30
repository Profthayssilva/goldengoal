// lib/whatsapp.ts

export async function enviarWhatsApp(numero: string, mensagem: string) {
  try {
    const token = process.env.WHATSAPP_TOKEN!;
    const phoneId = process.env.WHATSAPP_PHONE_ID!;
    const baseUrl = process.env.WHATSAPP_API_URL!;

    if (!token || !phoneId || !baseUrl) {
      console.error("[WHATSAPP] Variáveis .env ausentes.");
      return;
    }

    const payload = {
      messaging_product: "whatsapp",
      to: numero.replace(/\D/g, ""), // somente números
      type: "text",
      text: { body: mensagem },
    };

    const response = await fetch(
      `${baseUrl}/${phoneId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();
    console.log("[WHATSAPP] Enviado:", data);

    if (!response.ok) {
      throw new Error(JSON.stringify(data));
    }

    return data;
  } catch (error) {
    console.error("[WHATSAPP] Erro ao enviar:", error);
    return null;
  }
}
