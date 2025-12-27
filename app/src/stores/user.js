import axios from '@/config/axios'
import { defineStore } from 'pinia'

const persistedData = {
  user: JSON.parse(localStorage.getItem('user')),
  isAuth: localStorage.getItem('isAuth')
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: persistedData.user ?? {},
    isAuthenticated: persistedData.isAuth ?? false,
    isVerified: persistedData.isVerified ?? false
  }),
  getters: {
    fullName: (state) => state.user.name + ' ' + state.user.lastName
  },
  actions: {
    logout() {
      axios.post('/logout').then((data) => {
        this.user = {}
        this.isAuthenticated = false
        this.isVerified = false

        localStorage.removeItem('user')
        localStorage.removeItem('isAuth')
        localStorage.removeItem('isVerified')

        this.router.push({ name: 'home' })
      })
    },
    persistDataAfterLogin(data) {
      //pinia store
      this.isVerified = data.user?.email_verified_at
      this.isAuthenticated = true

      //local storage
      localStorage.setItem('isAuth', true)
      localStorage.setItem('isVerified', true)
    }
  }
})
