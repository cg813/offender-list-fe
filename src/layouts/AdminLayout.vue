<template>
  <div class="h-full">
    <!-- HEADER -->
    <div class="sticky-header pb-4 bg-gray-900">
      <Header />
    </div>
    <!-- BODY -->
    <div class="">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from '@/components/layouts/Header.vue'
</script>
