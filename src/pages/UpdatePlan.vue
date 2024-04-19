<template>
  <div class="dashboard mx-auto m-4">
    <div class="my-20">
      <h2 class="text-center text-4xl font-semibold tracking-tight text-white">Pricing plans</h2>
      <p class="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-300">
        Choose the plan that's best for you.
      </p>

      <div class="flex justify-center mt-10 max-w-md gap-8 lg:mx-0 lg:max-w-none">
        <UpdatePlanItem
          v-for="plan in plans"
          :key="plan.name"
          :plan="plan"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { usePlanStore } from '@/stores/plan'
import UpdatePlanItem from '@/components/UpdatePlanItem.vue'

const planStore = usePlanStore()

const isLoading = ref(false)

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
</script>

<style scoped>
.dashboard {
  max-width: 1160px;
  width: 100%;
  padding: 0 10px;
}
</style>
