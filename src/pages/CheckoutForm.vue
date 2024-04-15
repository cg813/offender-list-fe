<template>
  <div class="dashboard mx-auto">
    <stripe-checkout
      ref="checkoutRef"
      :pk="STRIPE_PUBLISHABLE_KEY"
      :session-id="sessionId"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { StripeCheckout } from '@vue-stripe/vue-stripe';
import { STRIPE_PUBLISHABLE_KEY } from '@/constants'

const route = useRoute()

const checkoutRef = ref()
const sessionId = route.query.sessionId as string

onMounted(() => {
  checkoutRef.value.redirectToCheckout()
})
</script>
