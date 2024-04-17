<template>
  <div class="dashboard mx-auto m-4">
    <div class="my-20">
      <h2 class="text-center text-4xl font-semibold tracking-tight text-white">Pricing plans</h2>
      <p class="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-300">
        Choose the plan that's best for you.
      </p>

      <div v-if="user" class="flex justify-center mt-10 max-w-md gap-8 lg:mx-0 lg:max-w-none">
        <div
          v-for="plan in plans"
          :key="plan.name"
          class="w-full max-w-xs"
          :class="[plan.name === user.plan ? 'bg-white bg-opacity-5 ring-2 ring-indigo-500' : 'ring-1 ring-white/10', 'rounded-xl p-8 xl:p-10']"
        >
          <div class="flex items-center justify-between gap-x-4">
            <h3 class="text-lg font-semibold leading-8 text-white">{{ plan.name }}</h3>
          </div>
          <!-- <p class="mt-4 text-sm leading-6 text-gray-300">{{ plan.description }}</p> -->
          <p class="mt-6 flex items-baseline gap-x-1">
            <span class="text-4xl font-bold tracking-tight text-white">${{ plan.price }}</span>
            <span class="text-sm font-semibold leading-6 text-gray-300">/{{ plan.frequency }}</span>
          </p>
          <button
            v-if="plan.name !== user.plan"
            class="w-full disabled:bg-gray-700"
            :class="[true ? 'bg-indigo-500 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline-indigo-500' : 'bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white', 'mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2']"
            :disabled="plan.name === user.plan"
            @click="subscribe(plan.id)"
          >
            Upgrade
          </button>
          <ul role="list" class="mt-8 space-y-3 text-sm leading-6 text-gray-300 xl:mt-10">
            <li class="flex gap-x-3">
              <CheckIcon class="h-6 w-5 flex-none text-white" aria-hidden="true" />
              {{ plan.requests }} rows
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { CheckIcon } from '@heroicons/vue/solid'
import { useToast } from 'vue-toastification'
import { useUserStore } from '@/stores/user'
import { usePlanStore } from '@/stores/plan'
import { router } from '@/router';

const userStore = useUserStore()
const planStore = usePlanStore()
const toast = useToast()

const isLoading = ref(false)

const user = computed(() => userStore.user)

const plans = computed(() => planStore.plans)

onMounted(() => {
  if (!planStore.plans.length) {
    fetchPlans()
  }
})

const fetchPlans = async () => {
  isLoading.value = true
  await planStore.fetchPlans()
  isLoading.value = false
}

const subscribe = async (
  priceId: string,
) => {
  if (!userStore.user?.customerId) {
    return
  }

  const lineItems = [{
    price: priceId,
    quantity: 1,
  }]

  const sessionId = await planStore.createCheckoutSession(
    userStore.user?.customerId,
    lineItems
  )

  if (!sessionId) {
    toast.error('Something went wrong!')
    return
  }
  
  // const subscriptionRes = await planStore.createSubscription({
  //   customerId: userStore.user.customerId,
  //   subscriptionType,
  //   priceId,
  // })
  // if (subscriptionRes && subscriptionRes.success) {
  //   router.push(`/checkout?subscription=${subscriptionRes.data.subscriptionId}&secret=${subscriptionRes.data.clientSecret}`)
  // } else {
  //   toast.error(subscriptionRes?.message || 'Something went wrong!')
  // }

  router.push(`/checkout?sessionId=${sessionId}`)
}
</script>

<style scoped>
.dashboard {
  max-width: 1160px;
  width: 100%;
  padding: 0 10px;
}
</style>
