<template>
  <div
    v-if="user"
    class="w-full max-w-xs"
    :class="[plan.name === user.plan ? 'bg-white bg-opacity-5 ring-2 ring-indigo-500' : 'ring-1 ring-white/10', 'rounded-xl p-8 xl:p-10']"
  >
    <div class="flex items-center justify-between gap-x-4">
      <h3 class="text-lg font-semibold leading-8 text-white">{{ plan.name }}</h3>
    </div>
    <!-- <p class="mt-4 text-sm leading-6 text-gray-300">{{ plan.description }}</p> -->
    <div class="mt-6 space-y-2">
      <p
        v-for="price of plan.prices"
        :key="price.id"
        class="flex items-baseline gap-x-1"
      >
        <input
          type="radio"
          :value="price.id"
          v-model="selectedPrice"
          class="mr-4"
        />
        <span class="text-2xl font-bold tracking-tight text-white">${{ price.unit_amount }}</span>
        <span class="text-sm font-semibold leading-6 text-white">/{{ price.recurring.interval }}</span>
      </p>
    </div>
    <button
      class="w-full disabled:bg-gray-700"
      :class="[plan.name !== user.plan ? 'bg-indigo-500 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline-indigo-500' : 'bg-white bg-opacity-5 text-gray-400 hover:bg-white/20 focus-visible:outline-white', 'mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2']"
      :disabled="plan.name === user.plan"
      @click="subscribe()"
    >
      {{ plan.name !== user.plan ? 'Upgrade' : 'Current' }}
    </button>
    <ul role="list" class="mt-8 space-y-3 text-sm leading-6 text-gray-300 xl:mt-10">
      <li class="flex gap-x-3">
        <CheckIcon class="h-6 w-5 flex-none text-green-600" aria-hidden="true" />
        {{ plan.requests }} rows per {{ plan.frequency }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType, ref } from 'vue'
import { useToast } from 'vue-toastification'
import { CheckIcon } from '@heroicons/vue/solid'
import { useUserStore } from '@/stores/user'
import { usePlanStore } from '@/stores/plan'
import { router } from '@/router';
import { IPlan } from '@/types';

const props = defineProps({
  plan: {
    type: Object as PropType<IPlan>,
    required: true,
  },
})

const userStore = useUserStore()
const planStore = usePlanStore()
const toast = useToast()

const selectedPrice = ref(props.plan.prices[0].id)

const user = computed(() => userStore.user)

const subscribe = async () => {
  if (!userStore.user?.customerId || !selectedPrice.value) {
    return
  }

  const lineItems = [{
    price: selectedPrice.value,
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

  router.push(`/checkout?sessionId=${sessionId}`)
}
</script>
