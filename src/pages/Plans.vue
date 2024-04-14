<template>
  <div class="bg-gray-900">
    <div class="mx-auto members">
      <div class="bg-gray-900 py-20">
        <div class="">
          <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
              <h1 class="text-2xl font-semibold leading-6 text-white">Plans</h1>
              <p class="mt-2 text-sm text-gray-300">List of all the plans</p>
            </div>
            <button @click="create" class="text-white border border-gray-400 px-2 py-1 rounded">
              Create New Plan
            </button>
          </div>
          <div class="mt-8 flow-root">
            <div class="-my-2 overflow-x-auto">
              <div class="inline-block min-w-full py-2 align-middle">
                <table class="min-w-full divide-y divide-gray-700">
                  <thead>
                    <tr>
                      <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">Name</th>
                      <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">Rows</th>
                      <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">Price</th>
                      <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">Frequency</th>
                    </tr>
                  </thead>
                  <tbody v-if="!isLoading" class="divide-y divide-gray-800">
                    <tr v-for="plan in plans" :key="plan.id">
                      <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">{{ plan.name }}</td>
                      <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">{{ plan.requests }}</td>
                      <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">$ {{ plan.price }}</th>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-300 capitalize">{{ plan.frequency }}</td>
                    </tr>
                  </tbody>
                  <div
                    v-else
                    class="w-5 h-5 border-4 border-white rounded-full animate-spin"></div>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue'
import { usePlanStore } from '@/stores/plan'
import { useUserStore } from '@/stores/user'
import { EUserRole } from '@/types'
import { useRouter } from 'vue-router'
import { useModal } from '@/components/modals/useModal'

const userStore = useUserStore()
const planStore = usePlanStore()
const router = useRouter()
const addPlanModal = useModal('add-plan')

const isLoading = ref(false)

const plans = computed(() => planStore.plans)

onMounted(() => {
  if (!planStore.plans.length) {
    fetchPlans()
  }
})

watch(
  () => userStore.isLoading,
  () => {
    if (!userStore.isLoading && userStore.user?.role !== EUserRole.ADMIN) {
      router.push('/detect')
    }
  }
)

const fetchPlans = async () => {
  isLoading.value = true
  await planStore.fetchPlans()
  isLoading.value = false
}

const create = () => {
  addPlanModal.show({
    refresh: fetchPlans
  })
}
</script>

<style scoped>
.members {
  width: 100%;
  max-width: 1160px;
  padding: 0 10px;
}
</style>
