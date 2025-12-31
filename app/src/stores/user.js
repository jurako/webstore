import axios from '@/config/axios'
import { defineStore } from 'pinia'

const persistedData = {
  user: JSON.parse(localStorage.getItem('user')),
  isAuth: localStorage.getItem('isAuth')
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: persistedData.user ?? {},
    token: persistedData.token ?? null,
    isAuthenticated: persistedData.isAuth ?? false,
    isVerified: persistedData.isVerified ?? false
  }),
  getters: {
    fullName: (state) => state.user.name + ' ' + state.user.lastname
  },
  actions: {
    logout() {
      axios.post('/logout').then((data) => {
        this.user = {}
        this.token = null
        this.isAuthenticated = false
        this.isVerified = false

        localStorage.removeItem('isAuth')
        localStorage.removeItem('isVerified')
        localStorage.removeItem('user')
        localStorage.removeItem('token')

        this.router.push({ name: 'home' })
      })
    },
    persistDataAfterLogin(data) {
      //pinia store
      this.user = data.user
      this.token = data.token
      this.isVerified = data.user?.email_verified_at
      this.isAuthenticated = true

      //local storage
      localStorage.setItem('isAuth', true)
      localStorage.setItem('isVerified', data.user?.email_verified_at)
      localStorage.setItem('user', JSON.stringify(data.user))
      localStorage.setItem('token', data.token)
    }
  }
})
