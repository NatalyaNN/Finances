export default defineNuxtRouteMiddleware(async (to) => {
   const protectedRoutes = ['/dashboard', '/settings']
   if (!protectedRoutes.includes(to.path)) return

   if (to.path.startsWith('/api/auth')) return
   if (to.path === '/login') return
   
   const { status } = useAuth()
   if (status.value !== 'authenticated' && !to.path.startsWith('/login') && to.meta.auth !== false) {
      return navigateTo('/login')
   }
})