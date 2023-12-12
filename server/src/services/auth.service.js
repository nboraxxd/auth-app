import { TOKEN_TYPE } from '@/constants/common'
import { envConfig } from '@/constants/config'
import { signToken, verifyToken } from '@/utils/jwt'
import User from '@/models/auth.model'
import RefreshToken from '@/models/refreshToken.model'

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

  /**
   * @param {*} user_id: ObjectId
   * @returns {Promise<{access_token: string, refresh_token: string}>}
   */
  async handleAuth(user_id) {
    const [access_token, refresh_token] = await authService.signAccessAndRefreshToken(user_id.toString())
    const { iat, exp } = await authService.decodeRefreshToken(refresh_token)

    await RefreshToken.create({
      token: refresh_token,
      user_id,
      iat: new Date(iat * 1000),
      exp: new Date(exp * 1000),
    })

    return {
      access_token,
      refresh_token,
    }
  },

  createUser({ _id, username, email, password, confirm_password, photo_url }) {
    return User.create({
      _id,
      username,
      email,
      password,
      confirm_password,
      photo_url,
    })
  },
}

export default authService
