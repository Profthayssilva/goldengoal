// lib/asaas.ts

// Se quiser produção, defina ASAAS_BASE_URL no .env.
// Se não definir, ele usa sandbox por padrão.
const DEFAULT_ASAAS_BASE_URL = "https://sandbox.asaas.com/api/v3";

export const ASAAS_BASE_URL =
  process.env.ASAAS_BASE_URL || DEFAULT_ASAAS_BASE_URL;

export const ASAAS_API_KEY = process.env.ASAAS_API_KEY!;

if (!ASAAS_API_KEY) {
  console.warn(
    "[ASAAS] ⚠️ ASAAS_API_KEY não configurada. Integração ficará inativa."
  );
}

export async function asaasRequest(path: string, options: any = {}) {
  const headers = {
    "Content-Type": "application/json",
    access_token: ASAAS_API_KEY,
    ...(options.headers || {}),
  };

  const res = await fetch(`${ASAAS_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("[ASAAS] Erro:", res.status, text);
    throw new Error("Erro ao comunicar com ASAAS");
  }

  return res.json();
}

// ================== TIPOS BÁSICOS ==================

export interface AsaasCustomerInput {
  name: string;
  cpfCnpj?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null; // aqui você pode quebrar em campos se quiser
}

export interface AsaasCustomer {
  id: string;
  name: string;
  email?: string;
  cpfCnpj?: string;
  // ... outros campos que o Asaas retornar
}

export interface AsaasPaymentInput {
  customerId: string;
  value: number;
  description: string;
  dueDate: string; // "YYYY-MM-DD"
}

export interface AsaasPayment {
  id: string;
  invoiceUrl?: string | null;
  bankSlipUrl?: string | null;
  pixQrCode?: string | null;
  pixPayload?: string | null;
  // ... outros campos
}

// ================== HELPERS PÚBLICOS ==================

export async function createAsaasCustomer(
  data: AsaasCustomerInput
): Promise<AsaasCustomer> {
  // Ajuste o mapeamento abaixo de acordo com o que você configurou no Asaas
  const payload: any = {
    name: data.name,
    email: data.email ?? undefined,
    cpfCnpj: data.cpfCnpj ?? undefined,
    mobilePhone: data.phone ?? undefined,
  };

  if (data.address) {
    payload.address = data.address;
  }

  const customer = await asaasRequest("/customers", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return customer as AsaasCustomer;
}

export async function createAsaasPayment(
  data: AsaasPaymentInput
): Promise<AsaasPayment> {
  const payload = {
    customer: data.customerId,
    billingType: "PIX", // você pode mudar para BOLETO, CREDIT_CARD, etc
    value: data.value,
    dueDate: data.dueDate,
    description: data.description,
  };

  const payment = await asaasRequest("/payments", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return payment as AsaasPayment;
}
