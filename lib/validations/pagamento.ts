import { z } from "zod";

export const pagamentoSchema = z.object({
  descricao: z.string().min(3),
  valor: z.number().positive(),
  status: z.string(),
  vencimento: z.string(), // será convertido para Date
  alunoId: z.string(),
  responsavelId: z.string(),

  asaasCustomerId: z.string().optional(),
  asaasPaymentId: z.string().optional(),
  pixQrCode: z.string().optional(),
  pixPayload: z.string().optional(),
  boletoUrl: z.string().optional(),
});
