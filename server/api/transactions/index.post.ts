import * as z from "zod/v4";
import { requireAuth } from "../../utils/auth"
import prisma from "../../utils/prisma"

export default defineEventHandler(async (event) => {
   const { user } = await requireAuth(event)
   const body = await readBody(event)

   const userId = user.id

   const schema = z.object({
      amount: z.number().positive(),
      type: z.enum(['income', 'expense']),
      categoryId: z.number(),
      date: z.string().datetime(),
      description: z.string().optional(),
      accountId: z.number(),
   })

   const validatedData = await schema.parseAsync(body)

   const transaction = await prisma.transaction.create({
      data: {
         ...validatedData,
         userId
      }
   })

   return transaction
})