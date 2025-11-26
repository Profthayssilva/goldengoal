import { z } from "zod";

export const mensagemSchema = z.object({
  titulo: z.string().min(3, "Título muito curto"),
  conteudo: z.string().min(3, "Conteúdo muito curto"),
  tipoEnvio: z.string().min(3),
  destino: z.string().min(3),
});
