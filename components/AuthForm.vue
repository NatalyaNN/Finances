<script setup lang=ts>
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const toast = useToast();

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined
})


async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
  // console.log(event.data)
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormField label="Email" name="email" required>
      <UInput v-model="state.email" type="email" autocomplete="username" />
    </UFormField>

    <UFormField label="Password" name="password" class="mt-4" required>
      <UInput v-model="state.password" type="password" autocomplete="current-password" />
    </UFormField>

    <UButton type="submit" class="mt-6" block>
      Войти
    </UButton>
  </UForm>
</template>

