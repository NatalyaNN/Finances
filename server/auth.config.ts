import { NuxtAuthHandler } from '#auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default NuxtAuthHandler({
   secret: process.env.AUTH_SECRET,
   providers: [
      CredentialsProvider({
         credentials: {
            email: { label: 'Email', type: 'text' },
            password: { label: 'Password', type: 'password' },
         },
         async authorize(credentials) {
            const user = await prisma.user.findUnique({
               where: { email: credentials?.email }
            })

            // if (user && await verifyPassword(credentials?.password, user.password)) {
            //    return { id: user.id, email: user.email }
            // }
            return {
               id: user?.id.toString(),
               email: user?.email,
               name: user?.name
             }
         }
      })
   ],
   callbacks: {
      // jwt({ token, user }) {
      //    if (user) {
      //       token.id = user.id
      //    }
      //    return token
      // },
      jwt({ token, account, profile }) {
         if (account) {
            token.sessionToken = account.session_token
         }
         return token
       },
      // session({ session, token }) {
      //    if (session.user && token.sub) {
      //       session.user.id = parseInt(token.sub || token.id)
      //    }
      //    return session
      // }
      async session({ session, token }) {
         // Token we injected into the JWT callback above.
         const newToken = token.sessionToken

         // Fetch data OR add previous data from the JWT callback.
         const additionalUserData = await $fetch(`/api/auth/${newToken}`)

         // Return the modified session
         return {
            ...session,
            user: {
               id: additionalUserData.id,
               name: additionalUserData.name,
               email: additionalUserData.name,
               // avatar: additionalUserData.avatar,
               // role: additionalUserData.role
            }
         }
       },
    }
})