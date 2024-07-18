import { defineStore } from 'pinia'
import $http from '@/api/service'

const getDefaultState = () => {
  return {
    total: 0
  }
}

export const useBillingStore = defineStore({
  id: 'billing',
  state: () => getDefaultState(),

  actions: {
    async getBilling(
      customerId: string,
      limit = 10,
      startingAfter: string | null = null
    ): Promise<any> {
      try {
        const response = await $http.get<any>(`/v1/stripe/billing?customerId=${customerId}&limit=${limit}&startingAfter=${startingAfter}`)
        return response.data
      } catch (error) {
        console.log(error)
        return []
      }
    },

    async createSetupIntent(customerId: string): Promise<string | null> {
      try {
        const response = await $http.post<string>('/v1/stripe/createSetupIntent', {
          customerId
        })
        return response.data
      } catch (error) {
        console.log(error)
        return null
      }
    },

    async getPaymentMethods(
      customerId: string,
    ): Promise<any> {
      try {
        const response = await $http.get<{
          cards: any[],
          default: string,
        }>(`/v1/stripe/paymentMethods/${customerId}`)
        return response.data
      } catch (error) {
        console.log(error)
        return null
      }
    },

    async setSubscriptionCard(
      customerId: string,
      paymentMethodId: string,
    ): Promise<any> {
      try {
        const response = await $http.post<string>('/v1/stripe/setSubscriptionCard', {
          customerId,
          paymentMethodId
        })
        return response.data
      } catch (error) {
        console.log(error)
        return null
      }
    },

    async getSubscriptionInfo(
      customerId: string,
    ): Promise<any> {
      try {
        const response = await $http.get<{
          subscriptionId: string,
          priceId: string,
        }>(`/v1/stripe/subscriptionPrice/${customerId}`)
        return response.data
      } catch (error) {
        console.log(error)
        return null
      }
    },
  }
})
