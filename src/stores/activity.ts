import { defineStore } from 'pinia'
import $http from '@/api/service'
import { IActivity, IActivityCreateDto, PaginationData } from '@/types'

const getDefaultState = () => {
  return {
    total: 0
  }
}

export const useActivityStore = defineStore({
  id: 'activity',
  state: () => getDefaultState(),

  actions: {
    async fetchActivity(
      userId: string,
      page: number,
      limit: number
    ): Promise<IActivity[]> {
      try {
        const response = await $http.get<PaginationData>(`/v1/activities/${userId}?page=${page}&limit=${limit}`)
        this.total = response.data.total
        return response.data.list
      } catch (error) {
        console.log(error)
        return []
      }
    },

    async createActivity(payload: IActivityCreateDto): Promise<IActivity | null> {
      try {
        const response = await $http.post('/v1/activities', payload)
        return response.data
      } catch (error) {
        console.log(error)
        return null
      }
    }
  }
})
