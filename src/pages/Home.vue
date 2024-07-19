<template>
  <div class="dashboard mx-auto m-4">
    <div class="my-20">
      <h2 class="text-center font-semibold tracking-tight text-white text-4xl">List Detection</h2>
      <div v-if="userStore.user && !userStore.user.paymentStatus">
        <p class="mt-8 text-center text-lg text-gray-300 font-thin">
          Payment was not made successfully.
        </p>
        <p
          @click="$router.push('/profile?tab=payment_method')"
          class="mt-2 text-center text-lg text-purple-700 font-thin cursor-pointer"
        >
          Please update your card.
        </p>
      </div>
      <div v-else-if="userStore.user && userStore.user.availableRequests > 0">
        <p class="mt-8 text-center text-lg text-gray-300 font-thin">
          {{ description }}
        </p>
        <p class="text-sm text-gray-300 text-center mt-6">
          Each row uploaded in your file will be processed and counted against your total remaining
        </p>
        <div class="mt-4 mx-auto max-w-xl">
          <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">Cover photo</label>
          <div
            class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-600 px-6 py-10"
            @dragover="fileDragOver"
            @dragleave="fielDragLeave"
            @drop="fileDrop"
          >
            <div v-if="!state.fileName" class="text-center">
              <DocumentIcon class="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
              <div class="my-4 flex leading-6 text-gray-600">
                <label for="file-upload" class="relative w-full cursor-pointer rounded-md text-indigo-600 hover:text-indigo-500">
                  <p class="text-lg">Upload a file</p>
                  <p class="text-sm leading-5 text-gray-600 ml-2">or Drag and Drop (XLSX or CSV)</p>
                  <input id="file-upload" name="file-upload" type="file" class="sr-only" accept="xlsx,csv" @change="onFileChange" />
                </label>
              </div>
              <a
                class="text-xs text-indigo-600 hover:text-indigo-500 cursor-pointer"
                href="Input- example.xlsx"
              >
                Download template
              </a>
            </div>
            <div v-else class="text-white">
              {{ state.fileName }}
            </div>
          </div>
          <div v-if="state.fileName && state.numberOfRows > 0" class="mt-10 flex flex-col items-center">
            <template v-if="!state.isLoading">
              <p class="text-white text-sm text-center mb-2">
                You are about to process {{ state.numberOfRows }} rows. Return result as:
              </p>
              <div class="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0 mb-4">
                <div class="flex items-center">
                  <input
                    id="xlsx"
                    name="result-format"
                    value="xlsx"
                    type="radio"
                    v-model="state.downloadFile"
                    :checked="state.downloadFile === 'xlsx'"
                    class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label for="xlsx" class="ml-3 block text-sm font-medium leading-6 text-white">XLSX File</label>
                </div>
                <div class="flex items-center">
                  <input
                    id="csv"
                    name="result-format"
                    value="csv"
                    v-model="state.downloadFile"
                    type="radio"
                    :checked="state.downloadFile === 'csv'"
                    class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label for="csv" class="ml-3 block text-sm font-medium leading-6 text-white">CSV File</label>
                </div>
              </div>
              <p class="mb-2 text-white text-center">{{ description2 }}</p>
              <div class="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0 mb-8">
                <div class="flex items-center">
                  <input
                    id="yes"
                    name="send-email"
                    :value="true"
                    type="radio"
                    v-model="state.sendEmail"
                    :checked="state.sendEmail === true"
                    class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label for="xlsx" class="ml-3 block text-sm font-medium leading-6 text-white">Yes</label>
                </div>
                <div class="flex items-center">
                  <input
                    id="no"
                    name="send-email"
                    :value="false"
                    v-model="state.sendEmail"
                    type="radio"
                    :checked="state.sendEmail === false"
                    class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label for="csv" class="ml-3 block text-sm font-medium leading-6 text-white">No</label>
                </div>
              </div>
              <div class="flex space-x-4">
                <button
                  type="button"
                  class="rounded bg-indigo-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  :disabled="!state.data"
                  @click="startProcessing"
                >
                  Start Processing
                </button>
                <button
                  type="button"
                  class="w-32 rounded bg-white bg-opacity-10 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
                  @click="cancel"
                >
                  Cancel
                </button>
              </div>
            </template>
            <template v-else>
              <!-- <div class="rounded-full bg-gray-600 w-full h-2 mx-auto">
                <div :style="{width: state.progress}" class="bg-red-500 h-2 rounded-full max-w-xl" />
              </div> -->
              <div
                style="border-top-color:transparent"
                class="w-5 h-5 mt-3 border-4 mx-auto border-blue-400 border-solid rounded-full animate-spin"></div>
            </template>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="mt-8 text-center text-lg text-gray-300 font-thin">
          Your account doesn't have available rows for processing.
        </p>
        <p
          @click="$router.push('/update-plan')"
          class="mt-2 text-center text-lg text-purple-700 font-thin cursor-pointer"
        >
          Please update your plan.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import * as XLSX from 'xlsx'
import { useUserStore } from '@/stores/user'
import { useOffenderListStore } from '@/stores/offenderList'
import { useToast } from 'vue-toastification'
import { DocumentIcon } from '@heroicons/vue/solid'

const userStore = useUserStore()
const offenderListStore = useOffenderListStore()
const toast = useToast()

const state = reactive({
  fileName: null as null | string,
  isLoading: false,
  downloadFile: 'xlsx' as 'xlsx' | 'csv',
  sendEmail: false,
  data: null as null | string,
  numberOfRows: 0,
})

const description = computed(() => {
  if (!userStore.user) {
    return ''
  }
  return `Your account has ${userStore.user.availableRequests} rows available for processing.`
})

const description2 = computed(() => {
  let estimated = 'less than 1'
  if (state.numberOfRows > 20000) {
    estimated = 'greater than 30'
  } else if (state.numberOfRows > 5000) {
    estimated = '20 - 30'
  } else if (state.numberOfRows > 2000) {
    estimated = '10 - 20'
  } else if (state.numberOfRows > 600) {
    estimated = '5 - 10'
  } else if (state.numberOfRows > 300) {
    estimated = '1 - 2'
  }
  return `Your estimated processing time is ${estimated} minutes. Should we send you an email when it's finished?`
})

const getData = (dataString: string) => {
  state.data = dataString
  const dataStringLines = dataString.split(/\r\n|\n/)
  state.numberOfRows = dataStringLines.length - 1
}

const onFileChange = async (e: any) => {
  const file = e.target.files[0]
  if (!file) {
    return
  }

  // Validation
  state.fileName = file.name
  const tmpName = file.name.split('.')
  const extension = tmpName.pop()?.toLowerCase()
  if (!extension || (extension !== 'xlsx' && extension !== 'csv')) {
    toast.error('Invalid file format. Must be xlsx file.')
    return
  }

  const reader = new FileReader()
  reader.onload = (evt: any) => {
    if (extension === 'xlsx') {
      const bstr = evt.target.result
      const wb = XLSX.read(bstr, {type: 'binary'})
      const wsname = wb.SheetNames[0]
      const ws = wb.Sheets[wsname]
      const dt = XLSX.utils.sheet_to_csv(ws)
      getData(dt);
    } else {
      const dt = evt.target.result
      getData(dt);
    }
  };
  reader.readAsBinaryString(file);
}

const cancel = () => {
  state.fileName = null
  state.numberOfRows = 0
  state.sendEmail = false
  state.data = null
  state.isLoading = false
}

const fileDragOver = (event: DragEvent) => {
  event.preventDefault()
}

const fielDragLeave = (event: DragEvent) => {
  event.preventDefault()
}

const fileDrop = (event: DragEvent) => {
  event.preventDefault()
  if (!event || !event.dataTransfer) {
    return
  }
  const files: FileList = event.dataTransfer.files
  if (!files.length) {
    return
  }
  const file = files[0]

  // Validation
  state.fileName = file.name
  const tmpName = file.name.split('.')
  const extension = tmpName.pop()?.toLowerCase()
  if (!extension || (extension !== 'xlsx' && extension !== 'csv')) {
    toast.error('Invalid file format. Must be xlsx file.')
    return
  }

  const reader = new FileReader()
  reader.onload = (evt: any) => {
    if (extension === 'xlsx') {
      const bstr = evt.target.result
      const wb = XLSX.read(bstr, {type: 'binary'})
      const wsname = wb.SheetNames[0]
      const ws = wb.Sheets[wsname]
      const dt = XLSX.utils.sheet_to_csv(ws)
      getData(dt);
    } else {
      const dt = evt.target.result
      getData(dt);
    }
  };
  reader.readAsBinaryString(file);
}

const startProcessing = async() => {
  if (!state.data) {
    return
  }
  state.isLoading = true
  const payload = {
    data: state.data,
    fileFormat: state.downloadFile,
    sendEmail: state.sendEmail,
  }
  const res = await offenderListStore.detection(payload)
  if (res.success) {
    await userStore.updateUser(userStore.user!._id, {})
    toast.success('Your list has been processed and can now be downloaded at Activities.');
    cancel();
  } else {
    toast.error(res.message || 'Something went wrong.')
  }
  state.isLoading = false
}
</script>

<style scoped>
.dashboard {
  max-width: 1160px;
  width: 100%;
  padding: 0 10px;
}
</style>
