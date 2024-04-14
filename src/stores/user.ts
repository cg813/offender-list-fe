import { defineStore } from 'pinia'
import $http from '@/api/service'
import { IEmailData, ILoginResponse, IUser, IUserCreateDao } from '@/types'

const getDefaultState = () => {
  const authorized = !!localStorage.getItem('token')
  const userId = localStorage.getItem('_id')
  const token = localStorage.getItem('token')
  return {
    user: null as null | IUser,
    token,
    userId,
    authorized: authorized,
    isLoading: false,
  }
}

export const useUserStore = defineStore({
  id: 'user',
  state: () => getDefaultState(),

  actions: {
    async fetchUser(
      id: string
    ): Promise<IUser | null> {
      try {
        const response = await $http.get<IUser>(`/users/${id}`)
        return response.data
      } catch (error) {
        console.log(error)
        return null
      }
    },

    async fetchAllUser(): Promise<IUser[]> {
      try {
        const response = await $http.get<IUser[]>('/users')
        return response.data
      } catch (error) {
        console.log(error)
        return []
      }
    },

    async updateUser(
      id: string,
      payload: Partial<IUser | {processedRows: number}>
    ): Promise<IUser | null> {
      try {
        const response = await $http.put<IUser>(`/users/${id}`, payload)
        if (response.data && this.user?._id === response.data._id) {
          this.user = response.data
        }
        return response.data
      } catch (error) {
        console.log(error)
        return null
      }
    },

    async login(
      email: string,
      password: string
    ): Promise<ILoginResponse | null> {
      try {
        const payload = {
          email,
          password
        }
        const response = await $http.post<ILoginResponse>(`/users/login`, payload)
        if (response.data?.success) {
          this.user = response.data.data!.user
          localStorage.setItem('_id', this.user._id)
          localStorage.setItem('token', response.data.data?.token || '')
          this.authorized = true
        }
        return response.data
      } catch (error) {
        console.log(error)
        return null
      }
    },

    logout() {
      localStorage.clear()
      this.user = null
      this.authorized = false
    },

    async changePassword(
      userName: string,
      password: string,
      newPassword: string,
    ): Promise<IUser | null> {
      try {
        const payload = {
          userName,
          password,
          newPassword
        }
        const response = await $http.patch<IUser>(`/users/changePassword`, payload)
        return response.data
      } catch (error) {
        console.log(error)
        return null
      }
    },

    async resetPasswordEmail(
      email: string,
      isAdmin = false,
    ): Promise<IUser | null> {
      try {
        const payload = {
          email,
          isAdmin
        }
        const response = await $http.patch<IUser>(`/users/resetPasswordEmail`, payload)
        return response.data
      } catch (error) {
        console.log(error)
        return null
      }
    },

    async resetPassword(
      email: string,
      password: string,
      token: string,
    ): Promise<IUser | null> {
      try {
        const payload = {
          email,
          password,
          token
        }
        const response = await $http.patch<IUser>(`/users/resetPassword`, payload)
        return response.data
      } catch (error) {
        console.log(error)
        return null
      }
    },

    async register(payload: IUserCreateDao): Promise<IUser | null> {
      try {
        const response = await $http.post('/users', payload)
        return response.data
      } catch (error) {
        console.log(error)
        return null
      }
    },

    async verifyEmail(
      email: string,
      token: string,
    ): Promise<IUser | null> {
      try {
        const payload = {
          email,
          token
        }
        const response = await $http.patch<IUser>(`/users/verifyEmail`, payload)
        this.user = response.data
        return response.data
      } catch (error) {
        console.log(error)
        return null
      }
    },

    async sendEmail(
      payload: IEmailData
    ): Promise<boolean> {
      try {
        const response = await $http.post(`/emails/send`, payload)
        if (response.data) {
          return !!response.data.success
        } else {
          return false
        }
      } catch (error) {
        console.log(error)
        return false
      }
    },

    async removeUser(
      id: string
    ): Promise<boolean> {
      try {
        const response = await $http.delete<boolean>(`/users/${id}`)
        return response.data
      } catch (error) {
        console.log(error)
        return false
      }
    },
  }
})
