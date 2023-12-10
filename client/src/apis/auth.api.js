import { http } from '@/utils/http'

const AUTH_URL = '/auth'

export const authApi = {
  register(body) {
    return http.post(`${AUTH_URL}/sign-up`, body)
  },
}
