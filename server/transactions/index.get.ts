import { requireAuth } from "../utils/auth"
import prisma from "../utils/prisma"

export default defineEventHandler(async (event) => {
   const { user } = await requireAuth(event)

   const userId = user.id

   const transactions = await prisma.transaction.findMany({
      where: { userId },
      include: { category: true },
      orderBy: { date: 'desc' }
   })

   return transactions
})