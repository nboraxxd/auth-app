import { http } from '@/utils/http'

const AUTH_URL = '/auth'
export const API_REFRESH_TOKEN_URL = `${AUTH_URL}/refresh-token`

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

  getMe() {
    return http.get(`${AUTH_URL}/me`)
  },

  updateMe(body) {
    return http.patch(`${AUTH_URL}/me`, body)
  },

  refreshToken() {
    return http.post(`${AUTH_URL}/refresh-token`)
  },

  signOut() {
    return http.post(`${AUTH_URL}/sign-out`)
  },

  delteMe() {
    return http.delete(`${AUTH_URL}/me`)
  },
}
