import { authRouteNames } from './auth.routes'
import { guardRouteNames } from './guard.routes'

export const routeNames = {
  rootPage: 'root',
  auth: 'auth',

  ...authRouteNames,
  ...guardRouteNames
}
