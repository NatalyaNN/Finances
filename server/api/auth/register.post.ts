// server/api/auth/register.post.ts
export default defineEventHandler(async (event) => {
   const body = await readBody(event)

   // Валидация
   const user = await prisma.user.create({
      data: {
         email: body.email,
         password: await hashPassword(body.password) // Реализуйте хеширование
      }
   })

   return { id: user.id }
})