import { http } from '@/utils/http'

const AUTH_URL = '/auth'

export const authApi = {
  signUp(body) {
    return http.post(`${AUTH_URL}/sign-up`, body)
  },

  signIn(body) {
    return http.post(`${AUTH_URL}/sign-in`, body)
  },

  oAuth(body) {
    return http.post(`${AUTH_URL}/google`, body)
  },

  updateMe(body) {
    return http.patch(`${AUTH_URL}/me`, body)
  },
}
