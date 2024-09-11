import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_AXIOS_API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})
