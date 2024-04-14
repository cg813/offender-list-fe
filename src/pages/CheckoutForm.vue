<template>
  <div v-if="secret" class="dashboard mx-auto">
    <div class="py-20 mx-auto w-full max-w-lg">
      <h2 class="text-center font-semibold tracking-tight text-white text-4xl">
        Checkout
      </h2>
      <!-- stripe -->
      <div 
        ref="card" 
        class="mt-12 mx-3 p-2.5 rounded-md border-2 border-solid text-white">
        <!-- Elements will create input elements here -->
      </div>

      <!-- We'll put the error messages in this element -->
      <div
        id="card-errors"
        role="alert"
        class="mx-3 text-error-message text-lg font-semibold"
      ></div>
      <div class="justify-center mx-3">
        <button
          class="w-full h-8 mb-3 text-white shadow-md bg-indigo-500 border mt-5 rounded-md hover:bg-indigo-400"
          :disabled="disabled"
          @click="submit"
        >
          Checkout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '../stores/user'
import { useRoute, useRouter } from 'vue-router'
import { STRIPE_PUBLISHABLE_KEY } from '@/constants'

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

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

const secret = ref(route.query.secret as string)
const subscription = ref(route.query.subscription as string)
const disabled = ref(false)
const card = ref(null)

onMounted(() => {
  el.mount(card.value)

  el.on('change', (event: HTMLElement) => {
    // displayError(event)
  })
})

const submit = async () => {
  disabled.value = true
  const clientSecret = secret.value

  const result = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      type: 'card',
      billing_details: { email: userStore.user?.email || '' },
      card: el,
    }
  })
  if (result.error) {
    disabled.value = false
    alert(result.error.message)
  } else {
    router.push({
      name: 'checkout-success',
      params: {
        subscription: subscription.value
      }
    })
  }
}
</script>
