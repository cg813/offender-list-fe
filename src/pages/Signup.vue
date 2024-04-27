<template>
  <div class="flex flex-1 flex-col justify-center px-6 py-20">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="text-center text-2xl font-bold leading-9 tracking-tight text-white">Create Account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="submit">
        <div>
          <label for="firstName" class="block text-sm font-medium leading-6 text-white">First Name</label>
          <div class="">
            <input
              id="firstName"
              name="firstName"
              v-model="state.firstName"
              type="text"
              :required="true"
              class="block w-full rounded-md border-0 bg-white bg-opacity-5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label for="lastName" class="block text-sm font-medium leading-6 text-white">Last Name</label>
          <div class="">
            <input
              id="lastName"
              name="lastName"
              v-model="state.lastName"
              type="text"
              :required="true"
              class="block w-full rounded-md border-0 bg-white bg-opacity-5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-white">Email</label>
          <div class="">
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
          <div class="">
            <label for="password" class="block text-sm font-medium leading-6 text-white">Password</label>
          </div>
          <div class="">
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
          <label for="company" class="block text-sm font-medium leading-6 text-white">Company</label>
          <div class="">
            <input
              id="company"
              name="company"
              v-model="state.company"
              type="text"
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
            Register
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { usePlanStore } from '@/stores/plan'
import { useToast } from 'vue-toastification'
import { EUserRole, IUserCreateDao } from '@/types'
import { router } from '@/router';

const userStore = useUserStore()
const planStore = usePlanStore()
const toast = useToast()

const state = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  company: '',
})

onMounted(async () => {
  if (!planStore.plans.length) {
    await planStore.fetchPlans()
  }
})

const goNext = computed(() => {
  return !!(state.firstName && state.lastName && state.email && state.password)
})

const submit = async () => {
  const payload: IUserCreateDao = {
    firstName: state.firstName,
    lastName: state.lastName,
    email: state.email,
    password: state.password,
    company: state.company || undefined,
    role: EUserRole.USER,
  }
  const userRes = await userStore.register(payload)
  if (userRes.success) {
    toast.success('Please verify your email.')
    router.push(`/send-verification-email?un=${state.email}`)
    state.firstName = ''
    state.lastName = ''
    state.password = ''
    state.email = ''
    state.company = ''
  } else {
    toast.error(userRes.message || 'Something went wrong!')
  }
}
</script>
