import { RouteRecordRaw } from 'vue-router'

import Login from '@/pages/Login.vue'
import Signup from '@/pages/Signup.vue'
import EmailVerification from '@/pages/EmailVerification.vue'
import SendVerificationEmail from '@/pages/SendVerificationEmail.vue'
import PasswordReset from '@/pages/ResetPassword.vue'
import PasswordResetEmail from '@/pages/ResetPasswordEmail.vue'
import ChoosePlan from '@/pages/ChoosePlan.vue'
import CheckoutForm from '@/pages/CheckoutForm.vue'
import CheckoutSuccess from '@/pages/CheckoutSuccess.vue'

export const authRouteNames = {
  login: 'login',
  signup: 'signup',
  emailVerification: 'email-verification',
  sendVerificationEmail: 'send-verification-email',
  resetPasswordEmail: 'reset-password-email',
  resetPassword: 'reset-password',
  choosePlan: 'choose-plan',
  checkout: 'checkout',
  checkoutSuccess: 'checkout-success',
}

export const authRoutes: RouteRecordRaw[] = [
  {
    path: 'login',
    name: authRouteNames.login,
    meta: {
      title: 'Login to your account',
      subtitle: 'Please enter yor email and password for sign in'
    },
    component: Login
  },
  {
    path: 'signup',
    name: authRouteNames.signup,
    meta: {
      title: 'Create your account',
    },
    component: Signup
  },
  {
    path: 'email-verification/:token',
    name: authRouteNames.emailVerification,
    meta: {
      title: 'Email verification',
    },
    component: EmailVerification
  },
  {
    path: 'send-verification-email',
    name: authRouteNames.sendVerificationEmail,
    meta: {
      title: 'Send verification email',
    },
    component: SendVerificationEmail
  },
  {
    path: 'reset-password/:token',
    name: authRouteNames.resetPassword,
    meta: {
      title: 'Enter new password',
      subtitle: 'Create your password using 8 characters or more.'
    },
    component: PasswordReset
  },
  {
    path: 'reset-password-email',
    name: authRouteNames.resetPasswordEmail,
    meta: {
      title: 'Enter new password',
      subtitle: 'Create your password using 8 characters or more.'
    },
    component: PasswordResetEmail
  },
  {
    path: 'choose-plan',
    name: authRouteNames.choosePlan,
    component: ChoosePlan
  },
  {
    path: 'checkout',
    name: authRouteNames.checkout,
    component: CheckoutForm
  },
  {
    path: 'checkout-success',
    name: authRouteNames.checkoutSuccess,
    component: CheckoutSuccess
  },
]
