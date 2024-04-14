<template>
  <div class="dashboard mx-auto">
    <div class="py-20">
      <h2 class="text-center font-semibold tracking-tight text-white text-4xl">
        Congratulations!
      </h2>
      <p class="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-300">
        Your plan is updated successfully!
      </p>
      <p @click="$router.push('/login')" class="mt-6 text-center text-indigo-400 cursor-pointer">log in</p>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  max-width: 1160px;
  width: 100%;
  padding: 0 10px;
}
</style>
