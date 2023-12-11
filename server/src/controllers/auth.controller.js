import HTTP_STATUS from '@/constants/httpStatus'
import { SIGNIN_MESSAGES, SIGNUP_MESSAGES } from '@/constants/message'
import User from '@/models/auth.model'
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
    const { password: _pasword, ...rest } = result._doc

    const { access_token, refresh_token } = await authService.handleAuth(result._id)

    // Set access_token and refresh_token as cookies
    res.cookie('access_token', access_token, { httpOnly: true })
    res.cookie('refresh_token', refresh_token, { httpOnly: true })

    res.status(HTTP_STATUS.CREATED).json({
      message: SIGNUP_MESSAGES.SUCCESS,
      result: rest,
    })
  } catch (error) {
    next(error)
  }
}

export async function signInController(req, res, next) {
  const { user } = req
  const { password: _pasword, ...rest } = user._doc

  try {
    const { access_token, refresh_token } = await authService.handleAuth(user._id)

    // Set access_token and refresh_token as cookies
    res.cookie('access_token', access_token, { httpOnly: true })
    res.cookie('refresh_token', refresh_token, { httpOnly: true })

    res.json({ message: SIGNIN_MESSAGES.SUCCESS, result: rest })
  } catch (error) {
    next(error)
  }
}
