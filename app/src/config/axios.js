import axios from 'axios'

const axiosApi = axios.create({
  baseURL: 'http://localhost/api',
  withCredentials: true
})

export { axiosApi }
