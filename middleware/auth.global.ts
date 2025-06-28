export default defineNuxtRouteMiddleware(async (to) => {
   const { status } = useAuth()
   if (status.value !== 'authenticated' && !to.path.startsWith('/login')) {
      return navigateTo('/login')
   }
})