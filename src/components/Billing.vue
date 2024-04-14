<template>
  <div class="w-full bg-gray-900 py-20">
    <div class="-my-2 overflow-x-auto">
      <div class="inline-block min-w-full py-2 align-middle">
        <table class="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">Date</th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white">Amount</th>
            </tr>
          </thead>
          <tbody v-if="!isLoading" class="divide-y divide-gray-800">
            <tr v-for="billing in billings" :key="billing.id">
              <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">{{ moment(billing.created * 1000).format('MM/DD/YYYY, hh:mm:ss') }}</td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-300 capitalize">$ {{ billing.amount / 100 }}</td>
            </tr>
          </tbody>
        </table>

        <div v-if="hasMore && !isLoading" class="w-full">
          <button
            class="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 mt-10"
            @click="fetchBilling"
          >
            Load more
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import moment from 'moment'
import { useUserStore } from '@/stores/user'
import { useBillingStore } from '@/stores/billing'

const userStore = useUserStore()
const billingStore = useBillingStore()

const billings = ref([] as any[])
const isLoading = ref(false)
const hasMore = ref(true)

onMounted(async () => {
  billings.value = []
  fetchBilling()
})

const fetchBilling = async (): Promise<void> => {
  if (!userStore.user?.customerId) {
    return
  }
  isLoading.value = true
  const lastObj = billings.value.length ? billings.value[billings.value.length - 1]?.id : null
  const billingRes = await billingStore.getBilling(userStore.user.customerId, 10, lastObj)
  if (billingRes.data?.length) {
    billings.value = billings.value.concat(billingRes.data)
  }
  hasMore.value = billingRes.has_more
  isLoading.value = false
}
</script>
