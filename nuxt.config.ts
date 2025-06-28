// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Finances',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ]
    }
  },
  routeRules: {
    '/tasks/**': {
      ssr: false,
      // appMiddleware: 'auth'
    }
  },
  nitro: {
    preset: 'node-server',
    routeRules: {
      '/api/**': {
        cors: true,
        headers: { 'Access-Control-Allow-Credentials': 'true' }
      }
    }
  },
  runtimeConfig: {
    // jwtSecret: process.env.JWT_SECRET || 'your-very-secret-key',
    authJs: {
      secret: process.env.AUTH_SECRET,
    },
    public: {
      authJs: {
        baseUrl: process.env.AUTH_ORIGIN || 'http://localhost:3000'
      },
    },
  },
  typescript: {
    includeWorkspace: true,
    tsConfig: {
      include: ["types/*.d.ts"]
    }
  },
  modules: [
    '@nuxt/ui',
    '@sidebase/nuxt-auth',
  ],
  auth: {
    provider: {
      type: 'authjs', // Используем Auth.js
      /*
      endpoints: {
        signIn: '/api/auth/signin',
        signOut: '/api/auth/signout',
        getSession: '/api/auth/session'
      },
      */
    },
    
    // baseUrl: process.env.AUTH_ORIGIN // Для корректных URL в production
    baseURL: '/api/auth',
    // globalAppMiddleware: false, // Для теста
  },
})