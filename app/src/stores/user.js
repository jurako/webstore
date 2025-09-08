import { axiosBackend } from '@/config/axios'
import { defineStore } from 'pinia'

const persistedData = {
  user: JSON.parse(localStorage.getItem('user')),
  isAuth: localStorage.getItem('isAuth')
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: persistedData.user ?? {},
    isAuthenticated: persistedData.isAuth ?? false
  }),
  getters: {
    fullName: (state) => state.user.name + ' ' + state.user.lastName
  },
  actions: {
    logout() {
      axiosBackend.post('/logout').then((data) => {
        this.user = {}
        this.isAuthenticated = false

        localStorage.removeItem('user')
        localStorage.removeItem('isAuth')

        this.router.push({ name: 'home' })
      })
    },
    persistDataAfterLogin(data) {
      //pinia store
      this.user = data
      this.isAuthenticated = true

      //local storage
      localStorage.setItem('isAuth', true)
      localStorage.setItem('user', JSON.stringify(data))
    }
  }
})
