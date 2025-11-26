import { z } from "zod";

export const userResponsavelSchema = z.object({
  userId: z.string(),
  responsavelId: z.string(),
});
