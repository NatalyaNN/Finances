import { requireAuth } from "../transactions/utils/auth"

export default defineEventHandler(async (event) => {
   // Пропускаем публичные маршруты
   if (event.path?.startsWith('/api/auth')) return

   // Проверяем авторизацию для всех /api маршрутов
   if (event.path?.startsWith('/api')) {
      await requireAuth(event)
   }
})