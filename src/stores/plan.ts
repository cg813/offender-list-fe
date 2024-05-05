import { defineStore } from 'pinia'
import $http from '@/api/service'
import { EStripeCheckoutMode, IPlan, IPlanCreateDto, ICreateSubscription, ISubscriptionResponse } from '@/types'

const getDefaultState = () => {
  return {
    plans: [] as IPlan[]
  }
}

export const usePlanStore = defineStore({
  id: 'plan',
  state: () => getDefaultState(),

  actions: {
    async fetchPlans(): Promise<IPlan[]> {
      try {
        const response = await $http.get<IPlan[]>('/stripe/pricingModels')
        this.plans = response.data || [];
        return response.data
      } catch (error) {
        console.log(error)
        return []
      }
    },

    async createPlan(payload: IPlanCreateDto): Promise<IPlan | null> {
      try {
        const response = await $http.post('/stripe/createPricingModel', payload)
        return response.data
      } catch (error) {
        console.log(error)
        return null
      }
    },

    async createSubscription(payload: ICreateSubscription): Promise<ISubscriptionResponse | null> {
      try {
        const response = await $http.post<ISubscriptionResponse>('/stripe/createSubscription', payload)
        return response.data
      } catch (error) {
        console.log(error)
        return null
      }
    },

    async createCheckoutSession(
      customerId: string,
      mode: EStripeCheckoutMode,
      lineItems?: any[],
    ): Promise<string | null> {
      try {
        const response = await $http.post<string>('/stripe/createCheckoutSession', {
          customerId,
          mode,
          lineItems,
        })
        return response.data
      } catch (error) {
        console.log(error)
        return null
      }
    }
  }
})
