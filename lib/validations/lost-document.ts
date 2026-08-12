import { z } from "zod";

export const lostDocumentSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),

  birthDate: z.string().optional(),

  profession: z.string().optional(),

  fatherName: z.string().optional(),

  motherName: z.string().optional(),

  birthPlace: z.string().optional(),

  lossCity: z.string().optional(),

  lossDate: z.string().optional(),

  cniNumber: z.string().optional(),

  phone: z.string().min(9)
});

export type LostDocumentInput =
  z.infer<typeof lostDocumentSchema>;
