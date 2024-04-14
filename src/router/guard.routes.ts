import { RouteRecordRaw } from 'vue-router'

import Home from '@/pages/Home.vue'
import Profile from '@/pages/Profile.vue'
import Users from '@/pages/Users.vue'
import Activity from '@/pages/Activity.vue'
import Register from '@/pages/Register.vue'
import Plans from '@/pages/Plans.vue'
import UpdatePlan from '@/pages/UpdatePlan.vue'
import CheckoutForm from '@/pages/CheckoutForm.vue'
import CheckoutSuccess from '@/pages/CheckoutSuccess.vue'

export const guardRouteNames = {
  detect: 'detect',
  profile: 'profile',
  users: 'users',
  activity: 'activity',
  register: 'register',
  plans: 'plans',
  updatePlan: 'update-plan',
  checkout: 'checkout',
  checkoutSuccess: 'checkout-success',
}

export const guardRoutes: RouteRecordRaw[] = [
  {
    path: 'detect',
    name: guardRouteNames.detect,
    component: Home
  },
  {
    path: 'register',
    name: guardRouteNames.register,
    component: Register
  },
  {
    path: 'profile',
    name: guardRouteNames.profile,
    component: Profile
  },
  {
    path: 'users',
    name: guardRouteNames.users,
    component: Users
  },
  {
    path: 'activity',
    name: guardRouteNames.activity,
    component: Activity
  },
  {
    path: 'plans',
    name: guardRouteNames.plans,
    component: Plans
  },
  {
    path: 'update-plan',
    name: guardRouteNames.updatePlan,
    component: UpdatePlan
  },
  {
    path: 'checkout',
    name: guardRouteNames.checkout,
    component: CheckoutForm
  },
  {
    path: 'checkout-success',
    name: guardRouteNames.checkoutSuccess,
    component: CheckoutSuccess
  },
]
