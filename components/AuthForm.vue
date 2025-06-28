<script setup>
const { signIn, signOut, session } = useAuth()
const email = ref('')
const password = ref('')

const handleLogin = async () => {
  await signIn('credentials', {
    email: email.value,
    password: password.value,
    callbackUrl: '/'
  })
}
</script>

<template>
  <UForm @submit="handleLogin">
    <UFormField label="Email">
      <UInput v-model="email" type="email" />
    </UFormField>
    <UFormField label="Password">
      <UInput v-model="password" type="password" />
    </UFormField>
    <UButton type="submit">Войти</UButton>
  </UForm>
</template>