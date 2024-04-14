import { defineStore } from 'pinia'
import $offenderListHttp from '@/api/offenderListService'
import { IOffender } from '@/types'

const getDefaultState = () => ({})

export const useOffenderListStore = defineStore({
  id: 'offenderList',
  state: () => getDefaultState(),

  actions: {
    async getOffenders(
      first_name: string,
      last_name: string,
      dob: string,
      state: string,
      zip_code: string
    ): Promise<IOffender[]> {
      try {
        const response = await $offenderListHttp.get<IOffender[]>(`/offenders?dob=${dob}&first_name=${first_name}&last_name=${last_name}&state=${state}&zip_code=${zip_code}`)
        return response.data
      } catch (error) {
        console.log(error)
        return []
      }
    }
  }
})
