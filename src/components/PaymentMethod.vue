<template>
  <div class="w-full max-w-lg">
    <h2 class="text-2xl font-bold leading-9 tracking-tight text-white">
      Payment methods
    </h2>

    <div v-if="!isLoading" class="space-y-4 mt-10">
      <div
        v-for="paymentMethod of paymentMethods"
        :key="paymentMethod.id"
        class="flex items-center justify-between space-x-8 text-white border-b border-gray-600"
      >
        <span class="w-32">{{ paymentMethod.card.brand }}</span>
        <span class="flex-1">**** **** **** {{ paymentMethod.card.last4 }}</span>
        <CheckIcon
          v-if="paymentMethod.id === subscriptionCard"
          class="text-green-500 w-6"
        />
        <button
          v-else
          class="text-purple-600"
          @click="setAsSubscriptionCard(paymentMethod.id)"
        >
          Enable
        </button>
      </div>
    </div>
    <div
      v-else
      class="w-5 h-5 mt-8 border-4 border-purple-500 rounded-full animate-spin"></div>

    <div class="justify-center mt-8">
      <button
        class="w-full h-8 mb-3 text-white shadow-md bg-indigo-500 border mt-5 rounded-md hover:bg-indigo-400"
        :disabled="disabled"
        @click="submit"
      >
        Link your card to your account
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { CheckIcon } from '@heroicons/vue/solid'
import { useUserStore } from '../stores/user'
import { useBillingStore } from '../stores/billing'
import { usePlanStore } from '@/stores/plan'
import { router } from '@/router';
import { EStripeCheckoutMode } from '@/types';

const userStore = useUserStore()
const billingStore = useBillingStore()
const toast = useToast()
const planStore = usePlanStore()

const paymentMethods = ref([] as any[])
const subscriptionCard = ref('')
const disabled = ref(false)
const isLoading = ref(false)

onMounted(() => {
  getPaymentMethods()
})

const getPaymentMethods = async (): Promise<void> => {
  if (userStore.user?.customerId) {
    isLoading.value = true
    const paymentMethodRes = await billingStore.getPaymentMethods(userStore.user?.customerId)
    if (paymentMethodRes) {
      paymentMethods.value = paymentMethodRes.cards
      subscriptionCard.value = paymentMethodRes.default
    }
    isLoading.value = false
  }
}

const submit = async () => {
  if (!userStore.user?.customerId) {
    return
  }
  disabled.value = true
  const sessionId = await planStore.createCheckoutSession(
    userStore.user.customerId,
    EStripeCheckoutMode.SETUP,
  )

  if (!sessionId) {
    toast.error('Something went wrong!')
    return
  }

  router.push(`/checkout?sessionId=${sessionId}`)
  disabled.value = false
}

const setAsSubscriptionCard = async (id: string): Promise<void> => {
  if (!userStore.user?.customerId) {
    return
  }
  isLoading.value = true
  const res = await billingStore.setSubscriptionCard(userStore.user.customerId, id)
  if (res && res.success) {
    await getPaymentMethods()
    toast.success(res.message)
  } else {
    toast.error('Something went wrong')
  }
  isLoading.value = false
}
</script>
