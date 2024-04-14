<template>
  <div class="w-full max-w-lg">
    <div class="">
      <h2 class="text-2xl font-bold leading-9 tracking-tight text-white">Send Email to Admin</h2>
    </div>

    <div class="mt-10">
      <form class="space-y-6" @submit.prevent="submit">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-white">Your Email</label>
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
          <label for="comment" class="block text-sm font-medium leading-6 text-white">Content</label>
          <div class="mt-2">
            <textarea
              id="comment"
              name="comment"
              v-model="state.comment"
              rows="4"
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
            Send
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
import { IEmailData } from '@/types'
import { EMAIL_SUPPORT } from '@/helpers'

const userStore = useUserStore()
const toast = useToast()

const state = reactive({
  email: '',
  comment: '',
})

const goNext = computed(() => {
  return !!(state.email && state.comment)
})

const submit = async () => {
  const payload: IEmailData = {
    to: EMAIL_SUPPORT,
    subject: 'Support',
    text: `Hi,\r\n\n A user with email: ${state.email} want your support. \r\n${state.comment}`
  }
  const result = await userStore.sendEmail(payload)
  if (result) {
    toast.success('Email sent successfully!')
    state.email = ''
    state.comment = ''
  } else {
    toast.error('Something went wrong')
  }
}
</script>
