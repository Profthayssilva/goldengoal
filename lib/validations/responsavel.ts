import { z } from "zod";

export const responsavelSchema = z.object({
  nome: z.string().min(3, "Nome muito curto"),
  email: z.string().email("E-mail inválido"),
  telefone: z.string().optional(),
  cpf: z.string().optional(),
  endereco: z.string().optional(),
});
