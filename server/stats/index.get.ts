export default defineEventHandler(async (event) => {
   const { userId } = await requireAuth(event)

   const [totalIncome, totalExpense] = await Promise.all([
      prisma.transaction.aggregate({
         where: {
            userId,
            type: 'income'
         },
         _sum: { amount: true }
      }),
      prisma.transaction.aggregate({
         where: {
            userId,
            type: 'expense'
         },
         _sum: { amount: true }
      })
   ])

   return {
      income: totalIncome._sum.amount || 0,
      expense: totalExpense._sum.amount || 0,
      balance: (totalIncome._sum.amount || 0) - (totalExpense._sum.amount || 0)
   }
})