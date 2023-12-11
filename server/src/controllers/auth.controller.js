import HTTP_STATUS from '@/constants/httpStatus'
import { SIGNIN_MESSAGES, SIGNUP_MESSAGES } from '@/constants/message'
import User from '@/models/auth.model'
import RefreshToken from '@/models/refreshToken.model'
import authService from '@/services/auth.service'

export async function signUpController(req, res, next) {
  const { username, email, password, confirm_password } = req.body

  try {
    const result = await User.create({
      username,
      email,
      password,
      confirm_password,
    })

    const [access_token, refresh_token] = await authService.signAccessAndRefreshToken(result._id.toString())

    const { iat, exp } = await authService.decodeRefreshToken(refresh_token)

    await RefreshToken.create({
      token: refresh_token,
      user_id: result._id,
      iat: new Date(iat * 1000),
      exp: new Date(exp * 1000),
    })

    res.status(HTTP_STATUS.CREATED).json({
      message: SIGNUP_MESSAGES.SUCCESS,
      result: {
        access_token,
        refresh_token,
      },
    })
  } catch (error) {
    next(error)
  }
}

export async function signInController(req, res, next) {
  const { user } = req
  const { password: _pasword, ...rest } = user._doc

  try {
    const [access_token, refresh_token] = await authService.signAccessAndRefreshToken(user._id.toString())
    const { iat, exp } = await authService.decodeRefreshToken(refresh_token)

    await RefreshToken.create({
      token: refresh_token,
      user_id: user._id,
      iat: new Date(iat * 1000),
      exp: new Date(exp * 1000),
    })

    // Set access_token and refresh_token as cookies
    res.cookie('access_token', access_token, { httpOnly: true })
    res.cookie('refresh_token', refresh_token, { httpOnly: true })

    // Send response with cookies
    res.json({ message: SIGNIN_MESSAGES.SUCCESS, result: rest })
  } catch (error) {
    next(error)
  }
}
