<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const isModalOpen = ref(false);
const toast = useToast();

const schema = z.object({
  amount: z.number().min(0, 'Сумма должна быть положительной'),
  category: z.string()
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  amount: undefined as number | undefined,
  category: undefined as string | undefined
})

const newTransaction = ref({
  type: 'expense', // 'income' или 'expense'
  amount: 0,
  category: 1, // id категории
  date: new Date().toISOString().split('T')[0], // Сегодняшняя дата
  description: ''
});

// Заглушка категорий (в реальном приложении загружается из API)
const categories = [
  { id: 1, name: 'Еда', type: 'expense' },
  { id: 2, name: 'Транспорт', type: 'expense' },
  { id: 3, name: 'Зарплата', type: 'income' }
];

// Фильтруем категории по типу транзакции
const filteredCategories = computed(() => {
  return categories.filter(cat => cat.type === newTransaction.value.type);
});

// Отправка формы (заглушка)
const submitTransaction = async (event: FormSubmitEvent<Schema>) => {
  // console.log('Добавлена транзакция:', newTransaction.value);
  // isModalOpen.value = false;
  // Здесь будет вызов API, например: 
  // await $fetch('/api/transactions', { method: 'POST', body: newTransaction.value });
  try {
    await $fetch('/api/transactions', {
      method: 'POST',
      body: newTransaction.value
    });
    toast.add({ title: 'Успешно!', color: 'success' });
    isModalOpen.value = false;
    refreshNuxtData(); // Обновляем список транзакций
  } catch (error) {
    toast.add({ title: 'Ошибка!', color: 'error' });
  }
};

const closeModal = () => {
  isModalOpen.value = false;
}
</script>

<template>
  <div>
    <!-- Модальное окно -->
    <UModal class="modal" v-model="isModalOpen">
      <!-- Кнопка открытия модалки -->
      <UButton icon="i-heroicons-plus" label="Добавить транзакцию" @click="isModalOpen = true" class="my-4" />

      <template #content>
        <UCard class="pl-4">
          <!-- Заголовок и кнопка закрытия -->
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-bold">Новая транзакция</h2>
            <UButton color="neutral" variant="ghost" icon="i-heroicons-x-mark" @click="closeModal" class="px-3" />
          </div>


          <!-- Форма -->
          <UForm :state="state" @submit="submitTransaction" class="block">
            <!-- Тип транзакции (доход/расход) -->
            <UFormField label="Тип" name="type" class="mb-4">
              <URadioGroup v-model="newTransaction.type" :items="[
                { value: 'income', label: 'Доход' },
                { value: 'expense', label: 'Расход' }
              ]" />
            </UFormField>

            <!-- Категория -->
            <UFormField label="Категория" name="category" class="mb-4">
              <USelect v-model="newTransaction.category"
                :items="filteredCategories.map(cat => ({ value: cat.id, label: cat.name }))"
                placeholder="Выберите категорию" class="w-80" />
            </UFormField>

            <!-- Сумма -->
            <UFormField label="Сумма" name="amount" class="mb-4">
              <UInput v-model.number="newTransaction.amount" type="number" placeholder="0"
                :rules="[(val: number) => val > 0 || 'Сумма должна быть положительной']" icon="i-lucide-russian-ruble"
                class="w-80" />
            </UFormField>

            <!-- Дата -->
            <UFormField label="Дата" name="date" class="mb-4">
              <UInput v-model="newTransaction.date" type="date" class="w-80" />
            </UFormField>

            <!-- Описание -->
            <UFormField label="Описание" name="description" class="mb-6">
              <UTextarea v-model="newTransaction.description" placeholder="Комментарий" class="w-80" />
            </UFormField>

            <!-- Кнопки -->
            <div class="flex justify-end gap-3">
              <UButton type="button" color="neutral" label="Отмена" @click="closeModal" />
              <UButton type="submit" color="primary" label="Сохранить" />
            </div>
          </UForm>
        </UCard>
      </template>
    </UModal>
  </div>
</template>