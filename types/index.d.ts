import { DefaultSession } from '@auth/core/types'
// import { DefaultSession } from "#auth";

declare module '@auth/core/types' {
   interface Session extends DefaultSession {
      user?: {
         id: string | number
      } & DefaultSession['user']
   }
}

declare module '#auth' {
   interface Session extends DefaultSession {
      user?: {
         id: string | number
      } & DefaultSession['user']
   }
}

// export default Session