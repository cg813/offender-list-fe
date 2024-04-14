<template>
  <div class="flex justify-between items-center border-t border-gray-200 px-4 sm:px-0">
    <div class="flex items-center pt-4 text-white text-sm">
      <div class="whitespace-nowrap mr-4"><span class="text-light">Showing <b>{{ startNum }}</b> to <b>{{ endNum }}</b> of {{ total }}</span></div>
      <select
        id="limit"
        name="limit"
        v-model="pageLength"
        class="capitalize block w-full rounded-md border-0 bg-white bg-opacity-5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
        @change="changePage(1, true)"
      >
        <option :value="10" class="text-black">
          10
        </option>
        <option :value="20" class="text-black">
          20
        </option>
        <option :value="50" class="text-black">
          50
        </option>
      </select>
    </div>
    <nav class="flex items-center justify-center">
      <div class="-mt-px flex">
        <button :disabled="currentPage < 2"
                @click="changePage(1, true)"
                class="cursor-pointer pt-4 pr-1 inline-flex items-center text-sm font-medium"
                :class="(currentPage < 2) ? 'text-gray-300' : 'text-purple-800'">
          <ChevronDoubleLeftIcon class="mr-3 h-5 w-5"
                                aria-hidden="true" />
        </button>
      </div>
      <div class="-mt-px flex">
        <button :disabled="currentPage < 2"
                @click="changePage(-1, false)"
                class="cursor-pointer pt-4 pr-1 inline-flex items-center text-sm font-medium"
                :class="(currentPage < 2) ? 'text-gray-300' : 'text-purple-800'">
          <ChevronLeftIcon class="mr-3 h-5 w-5"
                          aria-hidden="true" />
        </button>
      </div>
      <div class="md:-mt-px md:flex">
        <div class="text-indigo-600 pt-4 px-4 inline-flex items-center text-sm font-medium"
            aria-current="page"> {{ currentPage }} </div>
      </div>
      <div class="-mt-px flex justify-end">
        <button :disabled="currentPage >= last"
                @click="changePage(1, false)"
                class="cursor-pointer pt-4 pl-1 inline-flex items-center text-sm font-medium"
                :class="(currentPage >= last) ? 'text-gray-300' : 'text-purple-800'">
          <ChevronRightIcon class="mx-3 h-5 w-5"
                            aria-hidden="true" />
        </button>
      </div>
      <div class="-mt-px flex">
        <button :disabled="currentPage >= last"
                @click="changePage(last, true)"
                class="cursor-pointer pt-4 pr-1 inline-flex items-center text-sm font-medium"
                :class="(currentPage >= last) ? 'text-gray-300' : 'text-purple-800'">
          <ChevronDoubleRightIcon class="mr-3 h-5 w-5"
                                  aria-hidden="true" />
        </button>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { ChevronLeftIcon, ChevronRightIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/vue/solid'

const props = defineProps<{
  current: number;
  total: number;
}>()
const emit = defineEmits(['change'])
const pageLength = ref(10)

const last = computed(() => Math.ceil(props.total / pageLength.value))
const currentPage = computed(() => props.current)

const startNum = computed(() => (props.current - 1) * pageLength.value + 1)
const endNum = computed(() => {
  return Math.min((startNum.value + pageLength.value - 1), props.total)
})

function changePage(page: number, isStatic: boolean): void {
  if (isStatic) {
    emit('change', page, pageLength.value)
  } else {
    emit('change', currentPage.value + page, pageLength.value)
  }
}
</script>
