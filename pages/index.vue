<script setup>
// Composition API + Nuxt UI
import { ref } from 'vue';

// Данные пользователя (заглушка, потом заменим на Pinia/API)
const balance = ref(12500.50);
const currency = ref('₽');
const transactions = ref([
  { id: 1, category: 'Еда', amount: -500, date: '2023-10-15', type: 'expense' },
  { id: 2, category: 'Зарплата', amount: 30000, date: '2023-10-10', type: 'income' },
]);
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Шапка -->
    <UContainer class="py-8">
      <UCard>
        <div class="flex justify-between items-center mb-6">
          <div>
            <h1 class="text-2xl font-bold">Финансы</h1>
            <p class="text-gray-500">Общий баланс</p>
          </div>
          <div class="text-right">
            <p class="text-3xl font-bold">{{ balance }} {{ currency }}</p>
            <p class="text-green-500">+2% за месяц</p>
          </div>
        </div>

        <!-- Кнопки быстрых действий -->
        <div class="flex gap-4 mb-8">
          <UButton icon="i-heroicons-plus" color="green" label="Доход" />
          <UButton icon="i-heroicons-minus" color="red" label="Расход" />
          <UButton icon="i-heroicons-arrow-path" variant="outline" label="Перевод" />
        </div>

        <!-- График (заглушка) -->
        <UCard class="mb-8">
          <div class="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p class="text-gray-400">График статистики</p>
          </div>
        </UCard>

        <!-- Последние транзакции -->
        <h2 class="text-xl font-bold mb-4">Последние операции</h2>
        <UTable :rows="transactions" :columns="[
          { id: 1, key: 'category', label: 'Категория' },
          { id: 2, key: 'amount', label: 'Сумма' },
          { id: 3, key: 'date', label: 'Дата' }
        ]">
          <!-- Кастомный рендер суммы -->
          <template #amount-data="{ row }">
            <span :class="{ 'text-green-500': row.type === 'income', 'text-red-500': row.type === 'expense' }">
              {{ row.amount > 0 ? '+' : '' }}{{ row.amount }} {{ currency }}
            </span>
          </template>
        </UTable>
      </UCard>
    </UContainer>

    <!-- Боковое меню -->
    <div class="fixed bottom-0 left-0 right-0 bg-white border-t p-4 md:hidden">
      <div class="flex justify-around">
        <UButton icon="i-heroicons-home" variant="ghost" />
        <UButton icon="i-heroicons-chart-bar" variant="ghost" />
        <UButton icon="i-heroicons-cog" variant="ghost" />
      </div>
    </div>
  </div>
</template>