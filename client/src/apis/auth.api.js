import { http } from '@/utils/http'

const AUTH_URL = '/auth'

export const authApi = {
  signUp(body) {
    return http.post(`${AUTH_URL}/sign-up`, body)
  },

  signIn(body) {
    return http.post(`${AUTH_URL}/sign-in`, body)
  },
}
