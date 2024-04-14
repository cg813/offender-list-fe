<template>
  <div class="flex flex-1 flex-col justify-center px-6 py-20">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Reset your Password</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="submit">
        <div v-if="!state.fromAdmin">
          <label for="email" class="block text-sm font-medium leading-6 text-white">Email</label>
          <div class="mt-2">
            <input
              id="userName"
              name="userName"
              v-model="state.email"
              type="text"
              :required="true"
              class="block w-full rounded-md border-0 bg-white bg-opacity-5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-white">Password</label>
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
            Reset
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { useToast } from 'vue-toastification'
import { useRoute, useRouter } from 'vue-router'

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const toast = useToast()

const state = reactive({
  email: '',
  password: '',
  fromAdmin: false
})

onMounted(() => {
  const email = route.query.un as string
  if (email) {
    state.email = email
    state.fromAdmin = true
  }
})

const goNext = computed(() => {
  return !!(state.email && state.password)
})

const submit = async () => {
  const token = route.params.token as string
  if (!token) {
    toast.error('Invalid token')
    return;
  }
  const user = await userStore.resetPassword(state.email, state.password, token)
  if (user) {
    state.email = ''
    state.password = ''
    toast.success('Your password has been reset!')
    router.push('/login')
  } else {
    toast.error('Something went wrong!')
  }
}
</script>
