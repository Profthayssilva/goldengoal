import { z } from "zod";

export const preMatriculaSchema = z.object({
  alunoNome: z.string().min(3, "Nome do aluno muito curto"),
  alunoNascimento: z.string().optional(), // será convertido para Date
  alunoSerie: z.string().optional(),

  respNome: z.string().min(3, "Nome do responsável muito curto"),
  respEmail: z.string().email("Email inválido"),
  respTelefone: z.string().optional(),
  respCpf: z.string().optional(),
  respEndereco: z.string().optional(),

  status: z.string().optional(),
});
