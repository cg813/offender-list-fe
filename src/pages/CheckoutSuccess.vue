<template>
  <div class="dashboard mx-auto">
    <div class="py-20">
      <h2 class="text-center font-semibold tracking-tight text-white text-4xl">
        Congratulations!
      </h2>
      <p class="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-300">
        Your pricing plan is updated successfully!
      </p>
      <p @click="$router.push('/login')" class="mt-10 text-center text-indigo-400 cursor-pointer">Please log in again</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'

onMounted(() => {
  localStorage.clear()
})
</script>

<style scoped>
.dashboard {
  max-width: 1160px;
  width: 100%;
  padding: 0 10px;
}
</style>
