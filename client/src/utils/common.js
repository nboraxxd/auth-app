import axios, { HttpStatusCode } from 'axios'
import { twMerge } from 'tailwind-merge'
import { clsx } from 'clsx'

import { TOKEN_MESSAGES } from '@/constants/message'

export function cn(...args) {
  return twMerge(clsx(args))
}

function isAxiosError(error) {
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError(error) {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function isAxiosUnauthorizedError(error) {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}

export function isAxiosExpiredTokenError(error) {
  return isAxiosUnauthorizedError(error) && error.response?.data.message === TOKEN_MESSAGES.EXPIRED
}

export function isEmailNotFoundError(error) {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.NotFound
}
