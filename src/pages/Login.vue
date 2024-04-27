<template>
  <div class="flex flex-1 flex-col justify-center px-6 py-32">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-14 w-auto" src="img/logo.png" alt="Logo" />
      <!-- <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Sign in to your account</h2> -->
    </div>

    <div class="mt-20 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="submit">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-white">Email</label>
          <div class="mt-2">
            <input
              id="userName"
              name="userName"
              v-model="state.email"
              type="email"
              :required="true"
              class="block w-full rounded-md border-0 bg-white bg-opacity-5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-white">Password</label>
            <div class="text-xs text-indigo-400 hover:text-indigo-300 cursor-pointer" @click="router.push('/reset-password-email')">
              Forgot password?
            </div>
          </div>
          <div class="mt-2">
            <input
              id="password"
              name="password"
              v-model="state.password"
              type="password"
              autocomplete="current-password"
              :required="true"
              class="block w-full rounded-md border-0 bg-white bg-opacity-5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50 mt-10"
            :disabled="!goNext"
          >
            Sign in
          </button>
        </div>
        <div
          class="text-xs text-white text-center"
          @click="router.push('/signup')"
        >
          Don't you have account ? &nbsp; <span class="text-indigo-400 hover:text-indigo-300 cursor-pointer">Create account</span>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const toast = useToast()

const state = reactive({
  email: '',
  password: ''
})

watch(
  () => userStore.isLoading,
  () => {
    if (!userStore.isLoading && userStore.authorized && userStore.user) {
      router.push('/detect')
    }
  }
)

const goNext = computed(() => {
  return !!(state.email && state.password)
})

const submit = async () => {
  const loginRes = await userStore.login(state.email, state.password)
  if (loginRes) {
    if (loginRes.success) {
      state.email = ''
      state.password = ''
      router.push('/')
    } else {
      toast.error(loginRes.message || 'Something went wrong!')
      if (loginRes.message?.includes('Email')) {
        router.push(`/send-verification-email?un=${state.email}`)
      }
    }
  } else {
    toast.error('Something went wrong!')
  }
}
</script>
