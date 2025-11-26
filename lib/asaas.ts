export const ASAAS_BASE_URL = "https://sandbox.asaas.com/api/v3";
export const ASAAS_API_KEY = process.env.ASAAS_API_KEY!;

export async function asaasRequest(path: string, options: any = {}) {
  const headers = {
    "Content-Type": "application/json",
    "access_token": ASAAS_API_KEY,
  };

  const res = await fetch(`${ASAAS_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    console.error("Erro ASAAS:", await res.text());
    throw new Error("Erro ao comunicar com ASAAS");
  }

  return res.json();
}
