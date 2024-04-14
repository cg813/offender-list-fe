<template>
  <div class="bg-gray-900">
    <div class="mx-auto members">
      <div class="bg-gray-900 py-20">
        <div class="">
          <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
              <h1 class="text-2xl font-semibold leading-6 text-white">Activities</h1>
              <p class="mt-2 text-sm text-gray-300">List of all upload activities</p>
            </div>
          </div>
          <div class="mt-8 flow-root">
            <div class="-my-2 overflow-x-auto">
              <div class="inline-block min-w-full py-2 align-middle">
                <table class="min-w-full divide-y divide-gray-700">
                  <thead>
                    <tr>
                      <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">Date</th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white">Rows processed</th>
                    </tr>
                  </thead>
                  <tbody v-if="!isLoading" class="divide-y divide-gray-800">
                    <tr v-for="activity in activities" :key="activity._id">
                      <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">{{ moment(activity.createdAt).format('MM/DD/YYYY, hh:mm:ss') }}</td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-300 capitalize">{{ activity.processed }}</td>
                    </tr>
                  </tbody>
                </table>

                <div class="w-full mt-2">
                  <Pagination @change="changePage" :current="page" :total="total" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import moment from 'moment'
import Pagination from '@/components/Pagination.vue'
import { useUserStore } from '@/stores/user'
import { useActivityStore } from '@/stores/activity'
import { IActivity } from '@/types'

const userStore = useUserStore()
const activityStore = useActivityStore()

const activities = ref([] as IActivity[])
const isLoading = ref(false)
const page = ref(1)

onMounted(async () => {
  fetchActivities(10)
})

const total = computed(() => {
  return activityStore.total
})

const fetchActivities = async (pageLength: number): Promise<void> => {
  if (!userStore.userId) {
    return
  }
  activities.value = []
  isLoading.value = true
  activities.value = await activityStore.fetchActivity(userStore.userId, page.value, pageLength)
  isLoading.value = false
}

const changePage = async (p: number, pageLength: number) => {
  page.value = p
  fetchActivities(pageLength)
}

</script>

<style scoped>
.members {
  width: 100%;
  max-width: 1160px;
  padding: 0 10px;
}
</style>
