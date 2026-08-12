import { z } from "zod";

export const foundDocumentSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),

  cniNumber: z.string().optional(),

  birthDate: z.string().optional(),

  birthPlace: z.string().optional(),

  foundCity: z.string().min(2),

  foundDate: z.string(),

  description: z.string().optional(),

  depositorName: z.string().min(2),

  phone: z.string().min(9),

  whatsapp: z.string().optional(),

  email: z.string().email().optional().or(z.literal(""))
});
