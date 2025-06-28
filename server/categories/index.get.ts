export default defineEventHandler(async (event) => {
   const { userId } = await requireAuth(event)

   const categories = await prisma.category.findMany({
      where: { userId }
   })

   return categories
})