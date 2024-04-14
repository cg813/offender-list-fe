import { createRouter, createWebHistory, RouteRecordRaw, onBeforeRouteUpdate, useRoute } from 'vue-router'

import { routeNames } from './route-names'
import { routeGuard } from './route-guard'

import { authRoutes } from './auth.routes'
import { guardRoutes } from './guard.routes'

import AdminLayout from '@/layouts/AdminLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

const routes: Array<RouteRecordRaw> = [
  // Main Layout
  {
    path: '/',
    name: routeNames.rootPage,
    redirect: { name: routeNames.detect },
    meta: { requiresAuth: true },
    component: AdminLayout,
    children: guardRoutes
  },

  // Authentication Layout
  {
    path: '/',
    name: routeNames.auth,
    redirect: { name: routeNames.login },
    component: AuthLayout,
    children: authRoutes
  },

  // 404 Layout
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: routeNames.login },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(routeGuard)

export {
  router,
  routeNames,
  onBeforeRouteUpdate,
  useRoute
}
