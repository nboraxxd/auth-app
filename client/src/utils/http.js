import axios from 'axios'
import { envConfig } from '@/constants/config'

export const http = axios.create({
  baseURL: envConfig.serverUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})
