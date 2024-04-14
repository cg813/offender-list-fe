<template>
  <div class="bg-gray-900">
    <div class="mx-auto members">
      <div class="bg-gray-900 py-20">
        <div class="">
          <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
              <h1 class="text-2xl font-semibold leading-6 text-white">Members</h1>
              <p class="mt-2 text-sm text-gray-300">List of all the users</p>
            </div>
          </div>
          <div class="mt-8 flow-root">
            <div class="-my-2 overflow-x-auto">
              <div class="inline-block min-w-full py-2 align-middle">
                <table class="min-w-full divide-y divide-gray-700">
                  <thead>
                    <tr>
                      <th scope="col" class="py-3.5 pr-3 text-left text-sm font-semibold text-white sm:pl-0">Name</th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white">Email</th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white">Company</th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white">Plan</th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white">Rows Remaining</th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white">Reset Password</th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white">Edit</th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white">Remove</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-800">
                    <tr v-for="user in users" :key="user.email">
                      <td class="py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                        <div class="w-24 truncate">
                          {{ user.firstName }} {{ user.lastName }}
                        </div>
                      </td>
                      <td class="whitespace-nowrap py-4 px-3 text-sm font-medium text-white">
                        {{ user.email }}
                      </td>
                      <td class="whitespace-nowrap py-4 px-3 text-sm font-medium text-white">
                        {{ user.company }}
                      </td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                        {{ `${userPlan(user.plan)?.name}: ${userPlan(user.plan)?.requests} rows / ${userPlan(user.plan)?.frequency} ` }}
                      </td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                        {{ user.availableRequests }}
                      </td>
                      <td
                        class="whitespace-nowrap px-3 py-4 text-sm text-gray-300 cursor-pointer"
                        @click="sendEmail(user.email)"
                      >
                        Send Reset Email
                      </td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm">
                        <PencilIcon
                          class="text-green-600 w-5 ml-1 cursor-pointer"
                          aria-hidden="true"
                          @click="edit(user)"
                        />
                      </td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm">
                        <UserRemoveIcon
                          class="text-red-600 w-5 ml-4 cursor-pointer"
                          aria-hidden="true"
                          @click="remove(user)"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <EditUser
      v-model="showEditModal"
      :user="selectedUser"
      @updated="fetchAllUser"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import { usePlanStore } from '@/stores/plan'
import { EUserRole, IUser, IPlan } from '@/types'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { PencilIcon, UserRemoveIcon } from '@heroicons/vue/solid'
import { useModal } from '@/components/modals/useModal'
import EditUser from '@/components/newModals/EditUser.vue'

const userStore = useUserStore()
const planStore = usePlanStore()
const router = useRouter()
const toast = useToast()
const confirmModal = useModal('confirm')

const users = ref([] as IUser[])
const selectedUser = ref(null as null | IUser)
const showEditModal = ref(false)

onMounted(async () => {
  fetchAllUser()

  if (!planStore.plans.length) {
    await planStore.fetchPlans()
  }
})

watch(
  () => userStore.isLoading,
  () => {
    if (!userStore.isLoading && userStore.user?.role !== EUserRole.ADMIN) {
      router.push('/detect')
    }
  }
)

const plans = computed(() => planStore.plans)

const fetchAllUser = async (): Promise<void> => {
  selectedUser.value = null
  const _users = await userStore.fetchAllUser()
  users.value = _users?.filter(_ => _._id !== userStore.userId)
}

const userPlan = (planName: string): IPlan | null => {
  return plans.value.find(plan => plan.name === planName) || null
}

const sendEmail = async (email: string) => {
  const user = await userStore.resetPasswordEmail(email, true)
  if (!user) {
    toast.error('Something went wrong!')
  } else {
    toast.success('Sent email!')
  }
}

const removeUser = async () => {
  if (!selectedUser.value) {
    return
  }
  const res = await userStore.removeUser(selectedUser.value._id)
  if (res) {
    users.value = []
    const _users = await userStore.fetchAllUser()
    users.value = _users?.filter(_ => _._id !== userStore.user?._id)
  } else {
    toast.error('Something went wrong!')
  }
}

const remove = async (user: IUser) => {
  selectedUser.value = user
  confirmModal.show({
    title: 'Delete User',
    message: 'Are you sure you want to delete user?',
    confirm: removeUser
  })
}

const edit = async (user: IUser) => {
  selectedUser.value = user
  showEditModal.value = true
}
</script>

<style scoped>
.members {
  width: 100%;
  max-width: 1160px;
  padding: 0 10px;
}
</style>
