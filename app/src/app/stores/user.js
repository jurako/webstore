import axios from '@/config/axios'
import { defineStore } from 'pinia'

let user = localStorage.getItem('user');
user = (user !== 'undefined' && user !== 'null') ? JSON.parse(user) : {};

const persistedData = {
  user,
  token: localStorage.getItem('token'),
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true' ? true : false,
  isVerified: localStorage.getItem('isVerified') === 'true' ? true : false
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: persistedData.user ?? {},
    token: persistedData.token ?? null,
    isAuthenticated: persistedData.isAuthenticated ?? false,
    isVerified: persistedData.isVerified ?? false
  }),
  getters: {
    fullName: (state) => state.user.name + ' ' + state.user.lastname
  },
  actions: {

    //TODO: check somehow whether JWT is expired and sync with frontend state
    logout() {
      axios.post('/logout').then((data) => {
        this.user = {}
        this.token = null
        this.isAuthenticated = false
        this.isVerified = false

        localStorage.removeItem('isAuthenticated')
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
      this.isVerified = Boolean(data.user?.email_verified_at)
      this.isAuthenticated = true

      //local storage
      localStorage.setItem('isAuthenticated', true)
      localStorage.setItem('isVerified', Boolean(data.user?.email_verified_at))
      localStorage.setItem('user', JSON.stringify(data.user))
      localStorage.setItem('token', data.token)
    }
  }
})
