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
          <div v-if="state.fileName && state.list.length" class="mt-10 flex flex-col items-center">
            <template v-if="!state.isLoading">
              <p class="text-white text-sm text-center mb-4">
                You are about to process {{ state.list.length }} rows.
              </p>
              <p class="mb-4 text-sm text-center text-white">Return result as:</p>
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
              <p class="mb-8 text-white text-center">It can take several minutes to process. We will email when the file is ready.</p>
              <div class="flex space-x-4">
                <button
                  type="button"
                  class="rounded bg-indigo-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
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
              <div class="rounded-full bg-gray-600 w-full h-2 mx-auto">
                <div :style="{width: state.progress}" class="bg-red-500 h-2 rounded-full max-w-xl" />
              </div>
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
import moment from 'moment'
import { useUserStore } from '@/stores/user'
import { useOffenderListStore } from '@/stores/offenderList'
import { useToast } from 'vue-toastification'
import { DocumentIcon } from '@heroicons/vue/solid'
import { checkIsAvailableData, jsonToCsv, sleep } from '@/helpers'

const userStore = useUserStore()
const offenderListStore = useOffenderListStore()
const toast = useToast()

const state = reactive({
  fileName: null as null | string,
  header: [] as string[],
  list: [] as any[],
  isLoading: false,
  downloadFile: 'xlsx' as 'xlsx' | 'csv',
  progress: '10%'
})

const description = computed(() => {
  if (!userStore.user) {
    return ''
  }
  return `Your account has ${userStore.user.availableRequests} rows available for processing.`
})

const getData = (dataString: string) => {
  const dataStringLines = dataString.split(/\r\n|\n/)
  const list = []
  for (let i = 0; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/)
      const item = []
      for (let j = 0; j < row.length; j++) {
          let d = row[j]
          if (d.length > 0) {
              if (d[0] == '"')
              d = d.substring(1, d.length - 1)
              if (d[d.length - 1] == '"')
              d = d.substring(d.length - 2, 0)
              d = d.replaceAll('""', '"')
          }
          item.push(d)
      }

      // remove the blank rows
      if (Object.values(item).filter(x => x).length > 0) {
        if (i === 0) {
          item.push('Match')
          item.push('Details')
          state.header = item
        } else {
          list.push(item)
        }
      }
  }
  state.list = list
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
  state.header = []
  state.list = []
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

const downloadXLSXFile = () => {
  const workbook = XLSX.utils.book_new();
  workbook.Props = {
    Title: "Offender Detection",
    Subject: "Offender",
    Author: "OffenderList",
    CreatedDate: new Date()
  };
  workbook.SheetNames.push("Sheet1");
  const ws_data = [
    state.header,
    ...state.list
  ]
  const ws = XLSX.utils.aoa_to_sheet(ws_data);
  workbook.Sheets["Sheet1"] = ws;
  const wopts = { bookType:"xlsx", bookSST:false, type:"array" } as any;
  const wbout = XLSX.write(workbook, wopts);
  const blob = new Blob([wbout],{type:"application/octet-stream"})
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  const datetime = new Date().toISOString()
  link.download = `Result-${datetime}.xlsx`
  link.click()
}

const downloadCSVFile = () => {
  const fileParsed = jsonToCsv([
    state.header,
    ...state.list
  ])
  const fileBlob = new Blob([fileParsed], { type: 'text/csv' })
  const fileLink = document.createElement('a')
  fileLink.href = URL.createObjectURL(fileBlob)
  const datetime = new Date().toISOString()
  fileLink.download = `Result-${datetime}.csv`
  fileLink.click()
}

const startProcessing = async () => {
  if (!userStore.user) {
    return
  }
  const _availableRequests = Math.min(userStore.user.availableRequests, state.list.length)
  if (_availableRequests < 1) {
    toast.info('No available rows. please update your plan.')
    cancel()
    return
  }

  const headerLength = state.header.length - 2
  try {
    state.isLoading = true
    const availableList = state.list.slice(0, _availableRequests)
    const newList: any[] = []
    let _cnt = 0
    for (let i = 0; i < availableList.length; i++) {
      const data = [...availableList[i]]
      // Must have name
      if (!checkIsAvailableData(data)) {
        data[headerLength] = 'Incomplete'
        data[headerLength+1] = ''
        _cnt = _cnt + 1
      } else {
        let dob = ''
        if (data[2]) {
          dob = moment(data[2]).format('YYYY-MM-DD')
        }
        const offenders = await offenderListStore.getOffenders(data[0], data[1], dob, data[3] || '', data[4] || '')
        if (offenders.length) {
          data[headerLength] = `${offenders.length} Potential Matches`
          for (let j = 0; j < offenders.length; j++) {
            const image = offenders[j].image
            data[headerLength+1+j] = `${image}, ${JSON.stringify(offenders[j])}`
          }
        } else {
          data[headerLength] = 'No Match'
          data[headerLength+1] = ''
        }
        await sleep(50);
      }
      newList.push(data)
      state.progress = `${Math.round((i + 1) * 100 / availableList.length)}%`;
    }
    state.list = newList
    state.isLoading = false

    if (state.downloadFile === 'xlsx') {
      downloadXLSXFile()
    } else {
      downloadCSVFile()
    }
    cancel()

    const payload1 = {
      processedRows: _availableRequests
    }
    const payload2: IEmailData = {
      to: userStore.user.email,
      subject: 'Offender List detection',
      text: `Hi,\r\n\n Your file is ready and downlaoded automatically.`
    }
    await Promise.all([
      userStore.updateUser(userStore.user._id, payload1),
      userStore.sendEmail(payload2)
    ])
    toast.success('Detection finished successfully!')
  } catch (error) {
    console.log(error)
    toast.error('Something went wrong. please try again later')
  }
}
</script>

<style scoped>
.dashboard {
  max-width: 1160px;
  width: 100%;
  padding: 0 10px;
}
</style>
