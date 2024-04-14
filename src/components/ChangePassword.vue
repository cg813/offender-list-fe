<template>
  <div class="w-full max-w-lg py-20">
    <div class="">
      <h2 class="text-2xl font-bold leading-9 tracking-tight text-white">Change Your Password</h2>
    </div>

    <div class="mt-10">
      <form class="space-y-6" @submit.prevent="submit">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-white">Email</label>
          <div class="mt-2">
            <input
              id="email"
              name="email"
              v-model="state.email"
              type="email"
              :required="true"
              class="block w-full rounded-md border-0 bg-white bg-opacity-5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-white">Current Password</label>
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
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-white">New Password</label>
          </div>
          <div class="mt-2">
            <input
              id="new_password"
              name="new_password"
              v-model="state.newPassword"
              type="password"
              autocomplete="new-password"
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
            Confirm
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useUserStore } from '@/stores/user'
import { useToast } from 'vue-toastification'

const userStore = useUserStore()
const toast = useToast()

const state = reactive({
  email: '',
  password: '',
  newPassword: ''
})

const goNext = computed(() => {
  return !!(state.email && state.password && state.newPassword)
})

const submit = async () => {
  const user = await userStore.changePassword(state.email, state.password, state.newPassword)
  if (user) {
    state.email = ''
    state.password = ''
    state.newPassword = ''
    toast.success('Password is updated successfully!')
  } else {
    toast.error('Something went wrong!')
  }
}
</script>
