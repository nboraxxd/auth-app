import { TOKEN_TYPE } from '@/constants/common'
import { envConfig } from '@/constants/config'
import { signToken, verifyToken } from '@/utils/jwt'

const authService = {
  signAccessToken(user_id) {
    return signToken({
      payload: { user_id, token_type: TOKEN_TYPE.ACCESS_TOKEN },
      privateKey: envConfig.jwtSecretAccessToken,
      option: { expiresIn: envConfig.accessTokenExpiresIn, algorithm: 'HS256' },
    })
  },

  signRefreshToken(user_id) {
    return signToken({
      payload: { user_id, token_type: TOKEN_TYPE.REFRESH_TOKEN },
      privateKey: envConfig.jwtSecretRefreshToken,
      option: { expiresIn: envConfig.refreshTokenExpiresIn, algorithm: 'HS256' },
    })
  },

  decodeRefreshToken(refresh_token) {
    return verifyToken({ token: refresh_token, secretOrPublicKey: envConfig.jwtSecretRefreshToken })
  },

  signAccessAndRefreshToken(user_id) {
    return Promise.all([authService.signAccessToken(user_id), authService.signRefreshToken(user_id)])
  },
}

export default authService
