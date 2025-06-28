export default defineEventHandler(async (event) => {
   const { userId } = await requireAuth(event)

   const transactions = await prisma.transaction.findMany({
      where: { userId },
      include: { category: true },
      orderBy: { date: 'desc' }
   })

   return transactions
})