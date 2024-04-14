<template>
  <div class="w-full max-w-lg">
    <h2 class="text-2xl font-bold leading-9 tracking-tight text-white">
      User details
    </h2>

    <div class="mt-10">
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
          <label for="company" class="block text-sm font-medium leading-6 text-white">Company</label>
          <div class="">
            <input
              id="company"
              name="company"
              v-model="state.company"
              type="text"
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
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useToast } from 'vue-toastification'

const userStore = useUserStore()
const toast = useToast()

const isLoading = ref(false)

const state = reactive({
  firstName: '',
  lastName: '',
  company: '',
})

onMounted(() => {
  if (userStore.user) {
    state.firstName = userStore.user.firstName
    state.lastName = userStore.user.lastName
    state.company = userStore.user.company
  }
})

const goNext = computed(() => {
  return !!(!isLoading.value && state.firstName && state.lastName && state.company)
})

const submit = async () => {
  if (!userStore.user) {
    return
  }
  const payload = {
    firstName: state.firstName,
    lastName: state.lastName,
    company: state.company,
  }
  isLoading.value = true
  const user = await userStore.updateUser(userStore.user._id, payload)
  if (user) {
    toast.success('User info is updated successfully.')
  } else {
    toast.error('Something went wrong!')
  }
  isLoading.value = false
}
</script>
