<template>
  <vue-final-modal :name="modalName"
                   classes="flex justify-center items-center"
                   content-class="w-full max-w-lg flex flex-col mx-1 p-1 border-solid border-1 rounded-lg text-white bg-gray-900"
                   v-model="showModal"
                   @beforeOpen="beforeOpen">
    <div class="h-14 flex justify-between items-center text-right font-bold px-4">
      <span />
      <div class="self-center text-center text-white text-xl">{{ params.title }}</div>
      <img src="/img/close.svg"
           class="close-icon"
           @click="hide" />
    </div>

    <div class="px-6 py-4 text-center overflow-y-auto scrollbar-hide space-y-4">
      {{ params.message }}
    </div>

    <div class="grid grid-cols-2 gap-8 mt-8 px-6 pb-6">
      <button @click="hide"
              class="inline-flex justify-center items-center py-1.5 mx-auto text-md font-medium rounded w-full">
        Cancel
      </button>
      <button @click="confirm"
              class="inline-flex justify-center items-center py-1.5 mx-auto text-md font-medium rounded w-full border border-purple-600">
        Confirm
      </button>
    </div>
  </vue-final-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useModal } from './useModal'

const { modalName, showModal, hide } = useModal('confirm')
const params = ref({
  title: 'Confirm',
  message: 'Are you sure you want to perform this action?',
  confirm: Function
})

const beforeOpen = (event: any) => {
  params.value = event.ref.params.value
}

const confirm = async (): Promise<void> => {
  params.value.confirm()
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
