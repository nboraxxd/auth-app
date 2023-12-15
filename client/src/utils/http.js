import axios from 'axios'

import { envConfig } from '@/constants/config'
import { API_REFRESH_TOKEN_URL, authApi } from '@/apis/auth.api'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from '@/utils/common'

let refreshTokenRequest

export const http = axios.create({
  baseURL: envConfig.serverUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

http.interceptors.response.use(
  (response) => {
    return response
  },

  async (error) => {
    if (isAxiosUnauthorizedError(error)) {
      const { url } = error.config

      if (isAxiosExpiredTokenError(error) && !url.includes(API_REFRESH_TOKEN_URL)) {
        refreshTokenRequest = refreshTokenRequest
          ? refreshTokenRequest
          : handleRefreshToken().finally(() => {
              setTimeout(() => {
                refreshTokenRequest = null
              }, 3000)
            })

        return refreshTokenRequest
          .then(() => {
            return http(error.config)
          })
          .catch((error) => {
            return Promise.reject(error)
          })
      } else {
        // Những trường hợp như token không đúng, không truyền được token, token hết hạn nhưng gọi refresh token bị fail thì tiến hành như sau
        localStorage.removeItem('persist:auth')
        window.location.href = '/sign-in'
      }
    }
    return Promise.reject(error)
  }
)

async function handleRefreshToken() {
  await authApi.refreshToken()
}
