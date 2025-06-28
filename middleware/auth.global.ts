export default defineNuxtRouteMiddleware(async (to) => {
   const protectedRoutes = ['/dashboard', '/settings']
   if (!protectedRoutes.includes(to.path)) return
   
   if (to.path.startsWith('/api/auth')) return
   
   const { status } = useAuth()
   if (status.value !== 'authenticated' && !to.path.startsWith('/login')) {
      return navigateTo('/login')
   }
})