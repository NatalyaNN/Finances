export default defineEventHandler(async (event) => {
   const { userId } = await requireAuth(event)
   const body = await readBody(event)

   const schema = z.object({
      amount: z.number().positive(),
      type: z.enum(['income', 'expense']),
      categoryId: z.number(),
      date: z.string().datetime(),
      description: z.string().optional()
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