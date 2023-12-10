import axios, { HttpStatusCode } from 'axios'
import { twMerge } from 'tailwind-merge'
import { clsx } from 'clsx'

export function cn(...args) {
  return twMerge(clsx(args))
}

function isAxiosError(error) {
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError(error) {
  console.log('🚲 isAxiosError', axios.isAxiosError(error))
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}
