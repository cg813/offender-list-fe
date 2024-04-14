import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { routeNames } from '@/router'

export const routeGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> => {
  const userStore = useUserStore()
  userStore.authorized = !!localStorage.getItem('token')
  userStore.userId = localStorage.getItem('_id')

  if (to.matched.some((record) => record.meta?.requiresAuth)) {
    if (!userStore.authorized || !userStore.userId) {
      next({ name: routeNames.login })
    } else {
      next()
    }
  } else {
    next()
  }
}
