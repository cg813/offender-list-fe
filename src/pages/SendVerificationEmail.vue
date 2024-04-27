<template>
  <div class="dashboard mx-auto">
    <div class="py-20 flex flex-col items-center">
      <h2 class="text-center font-semibold tracking-tight text-white text-4xl mt-20">
        A verification email has been sent. Please check your inbox.
      </h2>
      <p class="text-white text-lg mt-10">
        Didn't receive a verification email?
      </p>
      <button
        @click="sendEmail"
        class="w-40 flex justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50 mt-4"
      >
        {{ isSend ? 'Send again' : 'Send now' }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const route = useRoute()
const toast = useToast()

const isSend = ref(false);

const sendEmail = async() => {
  const userEmail = route.query.un as string
  if (!userEmail) {
    toast.error('Something went wrong!')
    return
  }
  const res = await userStore.sendVerificationEmail(userEmail)
  if (res?.success) {
    toast.success('We sent verification email!')
    isSend.value = true
  } else {
    toast.error(res?.message || 'Something went wrong!')
  }
}
</script>

<style scoped>
.dashboard {
  max-width: 1160px;
  width: 100%;
  padding: 0 10px;
}
</style>
