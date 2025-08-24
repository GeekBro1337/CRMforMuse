import { z } from "zod";
import { prisma } from "../../utils/db";

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(5),
  preferredTime: z.string().optional(),
  comment: z.string().optional(),
});

export default defineEventHandler(async (event) => {
  const data = schema.parse(await readBody(event));
  const lead = await prisma.lead.create({ data });
  return { ok: true, id: lead.id };
});
