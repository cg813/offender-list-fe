<template>
  <div
    v-show="showWithDelay"
    class="fixed inset-x-0 px-4 pb-6 inset-0 flex items-center justify-center z-50 overflow-y-auto overflow-visible"
    @keyup.esc="close"
  >
    <transition
      enter-active-class="ease-out duration-300"
      enter-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="ease-in duration-200"
      leave-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="modelValue" class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0" :class="overlayClass" @click="closeOnBg" />
      </div>
    </transition>

    <transition
      enter-active-class="ease-out duration-300"
      enter-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      enter-to-class="opacity-100 translate-y-0 sm:scale-100"
      leave-active-class="ease-in duration-200"
      leave-class="opacity-100 translate-y-0 sm:scale-100"
      leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    >
      <div
        v-if="modelValue"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
        class="relative bg-gray-900 overflow-visible shadow-xl transform transition-all w-full rounded-lg p-5 text-white"
        :class="`${dialogMaxSizeClass}`"
        data-testid="global-div-any-request-modal"
      >
        <div class="absolute top-0 right-0 pt-4 pr-4 z-10">
          <button
            v-show="!hideCloseButton"
            type="button"
            class="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
            aria-label="Close"
            @click="close"
          >
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- slot -->
        <slot />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  overlayClass: {
    type: String,
    default: 'bg-gray-500 opacity-75'
  },
  dialogMaxSizeClass: {
    type: String,
    default: 'sm:w-auto'
  },
  hideCloseButton: {
    type: Boolean,
    default: false,
  },
  preventCloseOnBackground: {
    type: Boolean,
    default: false,
  }
})

const emit = defineEmits(['update:modelValue'])

const showWithDelay = ref(false)

watch(
  () => props.modelValue,
  () => {
    if (props.modelValue) {
      showWithDelay.value = true
    } else {
      close()
    }
  }
)

const close = (): void => {
  forceClose()
  emit('update:modelValue', false)
}

const forceClose = (): void => {
  setTimeout(() => {
    showWithDelay.value = false
  }, 400)
}

const closeOnBg = (): void => {
  if (props.preventCloseOnBackground) {
    close();
  }
}
</script>
