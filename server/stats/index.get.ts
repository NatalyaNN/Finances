import { requireAuth } from "../utils/auth"
import prisma from "../utils/prisma"

export default defineEventHandler(async (event) => {
   const { user } = await requireAuth(event)

   const userId = user.id

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