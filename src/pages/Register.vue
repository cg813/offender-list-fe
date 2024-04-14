<template>
  <div class="flex flex-1 flex-col justify-center px-6 py-20">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="text-center text-2xl font-bold leading-9 tracking-tight text-white">Register a new user</h2>
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
          <div class="">
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
          <label for="role" class="block text-sm font-medium leading-6 text-white">Role</label>
          <select
            id="role"
            name="role"
            v-model="state.role"
            class="mt-2 capitalize block w-full rounded-md border-0 bg-white bg-opacity-5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          >
            <option :value="EUserRole.USER" class="capitalize text-black">
              {{ EUserRole.USER }}
            </option>
            <option :value="EUserRole.ADMIN" class="capitalize text-black">
              {{ EUserRole.ADMIN }}
            </option>
          </select>
        </div>

        <div>
          <label for="plan" class="block text-sm font-medium leading-6 text-white">Plan</label>
          <select
            id="plan"
            name="plan"
            v-model="state.plan"
            class="mt-2 capitalize block w-full rounded-md border-0 bg-white bg-opacity-5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          >
            <option
              v-for="plan of plans"
              :key="plan.name"
              :value="plan.name"
              class="capitalize text-black"
            >
              {{ `${plan.name}: ${plan.requests} rows per ${plan.frequency} ` }}
            </option>
          </select>
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
import { computed, reactive, watch, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { usePlanStore } from '@/stores/plan'
import { useToast } from 'vue-toastification'
import { EUserRole, IUserCreateDao } from '@/types'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const planStore = usePlanStore()
const router = useRouter()
const toast = useToast()

const plans = computed(() => planStore.plans)

const state = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  role: EUserRole.USER,
  plan: plans.value[0]?.name || ''
})

onMounted(async () => {
  if (!planStore.plans.length) {
    await planStore.fetchPlans()
  }
})

const goNext = computed(() => {
  return !!(state.firstName && state.lastName && state.email && state.password)
})

watch(
  () => userStore.isLoading,
  () => {
    if (!userStore.isLoading && userStore.user?.role !== EUserRole.ADMIN) {
      router.push('/detect')
    }
  }
)

const submit = async () => {
  const selectedPlan = plans.value.find(plan => plan.name === state.plan)
  if (!selectedPlan) {
    toast.error('Incorrect Plan!')
    return
  }
  const payload: IUserCreateDao = {
    firstName: state.firstName,
    lastName: state.lastName,
    email: state.email,
    password: state.password,
    role: state.role,
    plan: state.plan,
    availableRequests: selectedPlan.requests
  }
  const user = await userStore.register(payload)
  if (user) {
    toast.success('User added successfully!')
    state.firstName = ''
    state.lastName = ''
    state.password = ''
    state.email = ''
  } else {
    toast.error('Something went wrong!')
  }
}
</script>
