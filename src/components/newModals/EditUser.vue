<template>
  <AppModal v-model="show" dialogMaxSizeClass="max-w-md">
    <h2 class="text-xl">Edit User</h2>

    <div  v-if="user" class="mt-10">
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
          <label for="requests" class="block text-sm font-medium leading-6 text-white">Rows</label>
          <div class="">
            <input
              id="requests"
              name="requests"
              v-model="state.requests"
              type="number"
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
  </AppModal>
</template>

<script lang="ts" setup>
import { computed, reactive, PropType, ref, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import { useToast } from 'vue-toastification'
import AppModal from './AppModal.vue';
import { EUserRole, IUser } from '@/types'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  user: {
    type: Object as PropType<IUser | null>,
    required: true,
  }
})

const userStore = useUserStore()
const toast = useToast()

const show = ref(false)
const isLoading = ref(false)

const emit = defineEmits(['updated', 'update:modelValue'])

const state = reactive({
  firstName: '',
  lastName: '',
  company: '',
  role: EUserRole.USER,
  requests: 0,
})

watch(
  () => props.modelValue,
  () => {
    show.value = props.modelValue

    if (props.user) {
      state.firstName = props.user.firstName
      state.lastName = props.user.lastName
      state.company = props.user.company
      state.role = props.user.role
      state.requests = props.user.availableRequests
    }
  }
)

watch(
  () => show.value,
  () => {
    emit('update:modelValue', show.value)
  }
)

const goNext = computed(() => {
  return !!(!isLoading.value && state.firstName && state.lastName && state.role)
})

const close = (): void => {
  show.value = false
}

const submit = async () => {
  if (!props.user) {
    return
  }
  const payload = {
    firstName: state.firstName,
    lastName: state.lastName,
    company: state.company || '',
    role: state.role,
    availableRequests: state.requests,
  }
  isLoading.value = true
  const user = await userStore.updateUser(props.user._id, payload)
  if (user) {
    toast.success('User info is updated successfully.')
    emit('updated')
  } else {
    toast.error('Something went wrong!')
  }
  close()
  isLoading.value = false
}
</script>
