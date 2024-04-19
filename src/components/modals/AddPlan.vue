<template>
  <vue-final-modal :name="modalName"
                   classes="flex justify-center items-center"
                   content-class="w-full max-w-lg flex flex-col mx-1 p-1 border-solid border-1 rounded-lg text-white bg-gray-900"
                   v-model="showModal"
                   @beforeOpen="beforeOpen">
    <div class="h-14 flex justify-between items-center text-right font-bold px-4">
      <span />
      <div class="self-center text-center text-white text-xl">Add New Plan</div>
      <img src="/img/close.svg"
           class="close-icon"
           @click="hide" />
    </div>

    <div class="p-6 overflow-y-auto scrollbar-hide space-y-4">
      <div>
        <label for="planName" class="block text-sm font-medium leading-6 text-white">Plan Name</label>
        <div class="mt-2">
          <input
            id="planName"
            name="planName"
            v-model="name"
            type="text"
            :required="true"
            class="block w-full rounded-md border-0 bg-white bg-opacity-5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <label for="price" class="block text-sm font-medium leading-6 text-white">Price (monthly)</label>
        <div class="mt-2 relative">
          <input
            id="price"
            name="price"
            v-model="price"
            type="number"
            min="0"
            :required="true"
            class="block w-full rounded-md border-0 bg-white bg-opacity-5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          />
          <span class="absolute top-2 right-3">$</span>
        </div>
      </div>
      <div>
        <label for="requests" class="block text-sm font-medium leading-6 text-white">Number of Requests</label>
        <div class="mt-2">
          <input
            id="requests"
            name="requests"
            v-model="requests"
            type="number"
            min="0"
            :required="true"
            class="block w-full rounded-md border-0 bg-white bg-opacity-5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <label for="frequency" class="block text-sm font-medium leading-6 text-white">Frequency</label>
        <select
          id="frequency"
          name="frequency"
          v-model="frequency"
          class="mt-2 capitalize block w-full rounded-md border-0 bg-white bg-opacity-5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
        >
          <option :value="EFrequencyForPlan.MONTH" class="capitalize text-black">
            {{ EFrequencyForPlan.MONTH }}
          </option>
          <option :value="EFrequencyForPlan.YEAR" class="capitalize text-black">
            {{ EFrequencyForPlan.YEAR }}
          </option>
        </select>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-8 mt-8 px-6 pb-6">
      <button @click="hide"
              class="inline-flex justify-center items-center py-1.5 mx-auto text-md font-medium rounded w-full border border-purple-600">
        Cancel
      </button>
      <button @click="confirm"
              :disabled="!canAdd"
              class="inline-flex justify-center items-center py-1.5 mx-auto text-md font-medium rounded w-full"
              :class="(!canAdd) ? 'bg-gray-200 text-gray-400' : 'bg-purple-600 text-white'">
        Confirm
      </button>
    </div>
  </vue-final-modal>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useModal } from './useModal'
import { EFrequencyForPlan } from '../../types'
import { usePlanStore } from '@/stores/plan'
import { useToast } from 'vue-toastification'

const { modalName, showModal, hide } = useModal('add-plan')
const planStore = usePlanStore()
const toast = useToast()
const name = ref('')
const requests = ref(0)
const price = ref(0)
const frequency = ref(EFrequencyForPlan.MONTH)
const params = ref({
  refresh: Function
})

const canAdd = computed(() => name.value)

const beforeOpen = (event: any) => {
  name.value = ''
  requests.value = 0
  price.value = 0
  frequency.value = EFrequencyForPlan.MONTH
  params.value = event.ref.params.value
}

const confirm = async (): Promise<void> => {
  if (!name.value) {
    return
  }
  await planStore.createPlan({
    name: name.value,
    price: (price.value || 0) * 100,
    requests: requests.value || 0,
    frequency: frequency.value
  })
  toast.success('Plan added successfully!')
  params.value.refresh()
  hide()
}
</script>

<style scoped>
.close-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
  align-self: center;
  justify-self: center;
  cursor: pointer;
}
</style>
