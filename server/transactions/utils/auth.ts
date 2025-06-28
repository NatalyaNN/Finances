export async function requireAuth(event: H3Event) {
   const session = await useSession(event)

   if (!session.user?.id) {
      throw createError({
         statusCode: 401,
         statusMessage: 'Unauthorized'
      })
   }

   return { userId: session.user.id }
 }