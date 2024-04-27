<template>
  <div class="flex justify-center px-6 py-20">
    <div v-if="!isLoading" class="sm:mx-auto sm:w-full sm:max-w-sm">
      <div v-if="isVerified">
        <p class="mt-10 text-center text-lg tracking-tight text-white">
          Email is verified successfully.
        </p>
      </div>
      <p v-else class="mt-10 text-center text-lg tracking-tight text-white">
        Email verification failed.
      </p>
    </div>
    <div
      v-else
      class="w-5 h-5 border-4 border-white rounded-full animate-spin"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '../stores/user'
import { useRoute } from 'vue-router'
import { router } from '@/router';

const userStore = useUserStore()
const route = useRoute()

const isVerified = ref(false)
const isLoading = ref(false)

onMounted(async () => {
  const email = route.query.un as string
  const token = route.params.token as string
  isLoading.value = true
  const user = await userStore.verifyEmail(email, token)
  if (user) {
    isVerified.value = true
    if (user.plan) {
      router.push('/login')
    } else {
      localStorage.setItem('customerId', user.customerId || '')
      router.push('/choose-plan')
    }
  }
  isLoading.value = false
})
</script>
