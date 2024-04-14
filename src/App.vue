<template>
  <div class="h-full">
    <router-view />

    <AddPlanModal />
    <ConfirmModal />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from './stores/user'
import AddPlanModal from '@/components/modals/AddPlan.vue'
import ConfirmModal from '@/components/modals/Confirm.vue'

const router = useRouter()
const userStore = useUserStore()

const main = async () => {
  const id = localStorage.getItem('_id')
  userStore.userId = id
  // userStore.authorized = !!localStorage.getItem('token')
  if (id && !userStore.user) {
    userStore.isLoading = true
    const _user = await userStore.fetchUser(id)
    userStore.isLoading = false
    if (!_user) {
      localStorage.clear()
      userStore.authorized = false
      router.push('/login')
      return
    } else {
      userStore.user = _user
    }
  }
}

setTimeout(() => main(), 0)
</script>
