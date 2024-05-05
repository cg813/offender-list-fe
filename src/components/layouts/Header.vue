<template>
  <div class="border-b-2 border-gray-800">
    <div class="header mx-auto">
      <div
        class="h-10 flex items-center cursor-pointer mr-12 md:mr-28"
        @click="$router.push('/detect')"
      >
        <img class="mx-auto h-full w-auto" src="img/logo.png" alt="Logo" />
      </div>
      <div class="flex space-x-8">
        <div
          class="flex items-center cursor-pointer border-b-2 border-transparent"
          :class="{'border-purple-700': $route.path.includes('detect')}"
          @click="$router.push('/detect')"
        >
          <span class="text-lg text-indigo-400">Detection</span>
        </div>

        <div
          class="flex items-center cursor-pointer border-b-2 border-transparent"
          :class="{'border-purple-700': $route.path.includes('update-plan')}"
          @click="$router.push('/update-plan')"
        >
          <span class="text-lg text-indigo-400">Membership</span>
        </div>

        <div
          class="flex items-center cursor-pointer border-b-2 border-transparent"
          :class="{'border-purple-700': $route.path.includes('activity')}"
          @click="$router.push('/activity')"
        >
          <span class="text-lg text-indigo-400">Activities</span>
        </div>

        <div
          v-if="isAdmin"
          class="flex items-center cursor-pointer border-b-2 border-transparent"
          :class="{'border-purple-700': $route.path.includes('users')}"
          @click="$router.push('/users')"
        >
          <span class="text-lg text-indigo-400">Members</span>
        </div>

        <div
          v-if="isAdmin"
          class="flex items-center cursor-pointer border-b-2 border-transparent"
          :class="{'border-purple-700': $route.path.includes('plans')}"
          @click="$router.push('/plans')"
        >
          <span class="text-lg text-indigo-400">Plans</span>
        </div>

        <!-- <div
          v-if="isAdmin"
          class="flex items-center cursor-pointer border-b-2 border-transparent"
          :class="{'border-purple-700': $route.path.includes('register')}"
          @click="$router.push('/register')"
        >
          <span class="text-lg text-indigo-400">Register</span>
        </div> -->

        <Avatar />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { EUserRole } from '@/types'
import Avatar from '../Avatar.vue'

const userStore = useUserStore()

const isAdmin = computed(() => {
  return userStore.user?.role === EUserRole.ADMIN
})
</script>

<style scoped>
.header {
  width: 100%;
  max-width: 1160px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 77px;
  padding: 0 10px;
}
</style>
