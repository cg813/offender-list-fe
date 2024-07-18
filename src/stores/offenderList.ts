import { defineStore } from 'pinia'
import $offenderListHttp from '@/api/offenderListService'
import { IDetectionRequest, IOffender, IResponse } from '@/types'
import $http from '@/api/service'

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
    },

    async detection(payload: IDetectionRequest): Promise<IResponse> {
      try {
        const response = await $http.post<IResponse>('/v1/detection', payload)
        return response.data
      } catch (error: any) {
        console.log(error)
        return {
          success: false,
          message: error.message
        }
      }
    },
  }
})
