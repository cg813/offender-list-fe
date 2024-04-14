<template>
  <div class="dashboard mx-auto mt-12">
    <div class="sm:hidden">
      <label for="tabs" class="sr-only">Select a tab</label>
      <select id="tabs" name="tabs" class="block w-full rounded-md border-none bg-white bg-opacity-5 py-2 pl-3 pr-10 text-base text-white shadow-sm ring-1 ring-inset ring-white ring-opacity-10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm">
        <option v-for="tab in state.tabs" :key="tab.name" :selected="tab.id === state.currentTab">{{ tab.name }}</option>
      </select>
    </div>
    <div class="hidden sm:block">
      <nav class="flex justify-center">
        <ul role="list" class="flex flex-none gap-x-6 text-sm font-semibold leading-6 text-gray-400">
          <li
            v-for="tab in state.tabs"
            :key="tab.id"
            :class="[tab.id === state.currentTab ? 'border-indigo-500 text-indigo-600 bg-white bg-opacity-5' : 'border-transparent text-gray-500 hover:border-gray-300', 'group inline-flex items-center border rounded-lg p-2 text-sm font-medium']"
            class="flex cursor-pointer"
            @click="selectTab(tab.id)"
          >
            <component :is="tab.icon" :class="[tab.id === state.currentTab ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500', '-ml-0.5 mr-2 h-5 w-5']" aria-hidden="true" />
            <span :class="tab.id === state.currentTab ? 'text-indigo-400' : ''">{{ tab.name }}</span>
          </li>
        </ul>
      </nav>
    </div>

    <div class="flex justify-center">
      <Account v-if="state.currentTab === 'profile'" />
      <ChangePassword v-if="state.currentTab === 'change_password'" />
      <PaymentMethod v-if="state.currentTab === 'payment_method'" />
      <Billing v-if="state.currentTab === 'billing'" />
      <Support v-if="state.currentTab === 'support'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { KeyIcon, UserIcon, ChatAltIcon, CurrencyDollarIcon, CreditCardIcon } from '@heroicons/vue/solid'
import Account from '@/components/Account.vue'
import ChangePassword from '@/components/ChangePassword.vue'
import Support from '@/components/Support.vue'
import Billing from '@/components/Billing.vue'
import PaymentMethod from '@/components/PaymentMethod.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const state = reactive({
  tabs: [
    { name: 'Profile', id: 'profile', icon: UserIcon },
    { name: 'Change Password', id: 'change_password', icon: KeyIcon },
    { name: 'Payment Method', id: 'payment_method', icon: CreditCardIcon },
    { name: 'Billing History', id: 'billing', icon: CurrencyDollarIcon },
    { name: 'Support', id: 'support', icon: ChatAltIcon }
  ],
  currentTab: (route.query.tab as string) || 'profile'
})

const selectTab = (id: string) => {
  state.currentTab = id
}
</script>

<style scoped>
.dashboard {
  max-width: 1160px;
  width: 100%;
  padding: 0 10px;
}
</style>
