import axios from 'axios'
import { SERVER_URL } from '@/constants/config'

export const http = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})
