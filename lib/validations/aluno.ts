import { z } from "zod";

export const alunoSchema = z.object({
  nome: z.string().min(2, "O nome é obrigatório."),

  responsavelId: z
    .string()
    .min(1, "Responsável é obrigatório.")
    .uuid("ID de responsável inválido."),

  // Aceita número OU string → converte para número automaticamente
  valorMensalidade: z
    .union([z.string(), z.number()])
    .transform((v) => Number(v))
    .refine((v) => !isNaN(v) && v >= 0, "Valor da mensalidade inválido."),

  foto: z.string().url().optional().nullable(),
  dataNascimento: z.string().optional().nullable(),
  observacoes: z.string().optional().nullable(),

  status: z
    .string()
    .optional()
    .default("ativo")
    .transform((val) => val?.toLowerCase()),
});
