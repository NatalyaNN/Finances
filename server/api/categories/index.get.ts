import { requireAuth } from "../../utils/auth"
import prisma from "../../utils/prisma"

export default defineEventHandler(async (event) => {
   const { userId } = await requireAuth(event)

   // const userId = user.id

   const categories = await prisma.category.findMany({
      where: { userId }
   })

   return categories
})