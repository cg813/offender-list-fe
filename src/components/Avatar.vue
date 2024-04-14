<template>
  <div v-if="userStore.user" class="relative">
    <div v-click-outside="clickOutside">
      <button
        class="max-w-xs rounded-full flex items-center text-indigo-400 text-sm border border-gray-600 focus:outline-none px-2 py-1"
        id="user-menu"
        aria-haspopup="true"
        @click="clickDropdown"
      >
        <UserIcon class="w-6 h-6 rounded-full" />

        <span class="text-indigo-400 block ml-2 text-base">
          {{ userStore.user.firstName }} {{ userStore.user.lastName }}
        </span>

        <svg
          class="block flex-shrink-0 ml-1 h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100 transform"
      enter-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75 transform"
      leave-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-800 z-10"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu"
        v-if="active"
      >
        <span
          class="block px-4 py-2 text-sm text-white cursor-pointer"
          role="menuitem"
          @click="$router.push('/profile')"
        >
          Settings
        </span>
        <span
          class="block px-4 py-2 text-sm text-white cursor-pointer"
          role="menuitem"
          @click="logout"
        >
          Logout
        </span>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { UserIcon } from '@heroicons/vue/solid'

const userStore = useUserStore()
const router = useRouter()

const active = ref(false)

const clickDropdown = (e) => {
  if (active.value) {
    active.value = false
    e.currentTarget.blur()
  } else {
    active.value = true
  }
}

const clickOutside = () => {
  if (active.value) {
    active.value = false
  }
}

const logout = () => {
  userStore.logout()
  router.push('/login')
}
</script>
