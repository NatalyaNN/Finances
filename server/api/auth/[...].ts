import { NuxtAuthHandler } from '#auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from '~/server/utils/prisma'

export default NuxtAuthHandler({
   secret: process.env.AUTH_SECRET,
   providers: [
      CredentialsProvider({
         name: 'Credentials',
         credentials: {
            email: { label: 'Email', type: 'text' },
            password: { label: 'Password', type: 'password' }
         },
         async authorize(credentials) {
            const user = await prisma.user.findUnique({
               where: { email: credentials?.email }
            })

            if (!user) return null

            // Проверка пароля
            const isValid = await comparePasswords(credentials?.password, user.password)
            if (!isValid) return null

            return {
               id: user.id.toString(),
               email: user.email,
               name: user.name
            }
         }
      })
   ],
   callbacks: {
      jwt({ token, user }) {
         if (user) {
            token.id = user.id
         }
         return token
      },
      session({ session, token }) {
         if (session.user && token.sub) {
            session.user.id = token.sub
         }
         return session
      }
   }
})

// Пример функции проверки пароля
async function comparePasswords(input: string | undefined, hashed: string) {
   return input === hashed //  bcrypt
}