<template>
  <div class="py-20 mx-auto w-full max-w-lg">
    <h2 class="text-2xl font-bold leading-9 tracking-tight text-white">
      Payment methods
    </h2>

    <div class="space-y-4 mt-10">
      <div
        v-for="paymentMethod of paymentMethods"
        :key="paymentMethod.id"
        class="flex items-center space-x-8 text-white border-b border-gray-600"
      >
        <span class="w-40">{{ paymentMethod.card.brand }}</span>
        <span class="w-40">**** **** **** {{ paymentMethod.card.last4 }}</span>
      </div>
    </div>

    <!-- stripe -->
    <div 
      ref="card" 
      class="mt-20 p-2.5 rounded-md border-2 border-solid text-white">
      <!-- Elements will create input elements here -->
    </div>

    <!-- We'll put the error messages in this element -->
    <div
      id="card-errors"
      role="alert"
      class="text-error-message text-lg font-semibold"
    ></div>

    <div class="justify-center">
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
import { useUserStore } from '../stores/user'
import { useBillingStore } from '../stores/billing'
import { STRIPE_PUBLISHABLE_KEY } from '../constants'

const userStore = useUserStore()
const billingStore = useBillingStore()
const toast = useToast()

const stripe = (window as any).Stripe(STRIPE_PUBLISHABLE_KEY)
const elements = stripe?.elements()

const style = {
  base: {
    color: '#fff',
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    '::placeholder': {
      color: '#aab7c4'
    }
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a'
  }
}
const el = elements.create('card', { style: style })

const paymentMethods = ref([] as any[])
const disabled = ref(false)
const card = ref(null)
const isLoading = ref(false)

onMounted(() => {
  getPaymentMethods()

  el.mount(card.value)

  el.on('change', (event: HTMLElement) => {
    // displayError(event)
  })
})

const getPaymentMethods = async (): Promise<void> => {
  if (userStore.user?.customerId) {
    isLoading.value = true
    paymentMethods.value = await billingStore.getPaymentMethods(userStore.user?.customerId)
    isLoading.value = false
  }
}

const submit = async () => {
  if (!userStore.user?.customerId) {
    return
  }
  disabled.value = true
  const clientSecret = await billingStore.createSetupIntent(userStore.user.customerId!)
  if (!clientSecret) {
    disabled.value = false
    return
  }

  const result = await stripe.confirmCardSetup(clientSecret, {
    payment_method: {
      type: 'card',
      billing_details: { email: userStore.user?.email },
      card: el,
    }
  })
  if (result.error) {
    toast.error(result.error.message)
  } else {
    toast.success('Card is linked successfully.')
    getPaymentMethods();
  }
  disabled.value = false
}
</script>
