import { z } from "zod";

export const reportSchema = z.object({
  reason: z.string().min(2),
  description: z.string().optional(),
  phone: z.string().optional(),
  targetType: z.enum(["FOUND", "LOST"]).optional(),
  targetId: z.string().optional(),
});
