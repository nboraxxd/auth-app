import { ObjectId } from 'mongodb'
import generator from 'generate-password'

import HTTP_STATUS from '@/constants/httpStatus'
import {
  GET_ME_MESSAGES,
  GOOGLE_OAUTH_MESSAGES,
  REFRESH_TOKEN_MESSAGES,
  SIGNIN_MESSAGES,
  SIGNOUT_MESSAGES,
  SIGNUP_MESSAGES,
  UPDATE_ME_MESSAGES,
  USER_MESSAGES,
} from '@/constants/message'
import authService from '@/services/auth.service'
import User from '@/models/auth.model'
import { ErrorWithStatus } from '@/models/Errors'
import RefreshToken from '@/models/refreshToken.model'

export async function signUpController(req, res, next) {
  const { username, email, password, confirm_password } = req.body

  try {
    const result = await authService.createUser({ username, email, password, confirm_password })
    const { password: _password, ...rest } = result._doc

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
  const { password: _password, ...rest } = user._doc

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

export async function googleOAuthController(req, res, next) {
  const { name, email, photo_url } = req.body

  try {
    const user = await User.findOne({ email })

    if (user) {
      const { password: _password, ...rest } = user._doc
      const { access_token, refresh_token } = await authService.handleAuth(user._id)

      // Set access_token and refresh_token as cookies
      res.cookie('access_token', access_token, { httpOnly: true })
      res.cookie('refresh_token', refresh_token, { httpOnly: true })

      res.json({ message: GOOGLE_OAUTH_MESSAGES.SIGNIN_SUCCESSFULLY, result: { ...rest, new_user: false } })
    } else {
      const password = generator.generate({
        length: 10,
        numbers: true,
        symbols: true,
        lowercase: true,
        uppercase: true,
        strict: true,
      })
      const user_id = new ObjectId()

      const result = await authService.createUser({
        _id: user_id,
        username: `${name.replaceAll(' ', '').toLowerCase()}${user_id}`,
        email,
        password,
        confirm_password: password,
        photo_url,
      })
      const { password: _password, ...rest } = result._doc
      const { access_token, refresh_token } = await authService.handleAuth(result._id)

      // Set access_token and refresh_token as cookies
      res.cookie('access_token', access_token, { httpOnly: true })
      res.cookie('refresh_token', refresh_token, { httpOnly: true })

      res.status(HTTP_STATUS.CREATED).json({
        message: GOOGLE_OAUTH_MESSAGES.SIGNUP_SUCCESSFULLY,
        result: { ...rest, new_user: true },
      })
    }
  } catch (error) {
    next(error)
  }
}

export const getMeController = async (req, res, next) => {
  const { decoded_access_token } = req
  try {
    const user = await User.findById(new ObjectId(decoded_access_token.user_id))

    if (!user) {
      throw new ErrorWithStatus({ message: USER_MESSAGES.NOT_FOUND, statusCode: HTTP_STATUS.NOT_FOUND })
    }

    const { password: _password, ...rest } = user._doc
    return res.json({ message: GET_ME_MESSAGES.SUCCESS, result: rest })
  } catch (error) {
    next(error)
  }
}

export const updateMeController = async (req, res, next) => {
  const { decoded_access_token } = req
  const { username, password, confirm_password, photo_url } = req.body

  try {
    const user = await User.findById(new ObjectId(decoded_access_token.user_id))

    if (!user) {
      throw new ErrorWithStatus({ message: USER_MESSAGES.NOT_FOUND, statusCode: HTTP_STATUS.NOT_FOUND })
    }

    if (username) user.username = username
    if (password) user.password = password
    if (photo_url) user.photo_url = photo_url
    if (!password && !confirm_password) {
      user.confirm_password = user.password
    } else {
      user.confirm_password = confirm_password
    }

    const result = await user.save()
    const { password: _password, ...rest } = result._doc

    res.json({ message: UPDATE_ME_MESSAGES.SUCCESS, result: rest })
  } catch (error) {
    next(error)
  }
}

export const refreshTokenController = async (req, res, next) => {
  const { decoded_refresh_token } = req
  const { refresh_token } = req.cookies

  try {
    const { new_access_token, new_refresh_token } = await authService.refreshToken(refresh_token, decoded_refresh_token)

    // Set access_token and refresh_token as cookies
    res.cookie('access_token', new_access_token, { httpOnly: true })
    res.cookie('refresh_token', new_refresh_token, { httpOnly: true })

    res.json({ message: REFRESH_TOKEN_MESSAGES.SUCCESS })
  } catch (error) {
    next(error)
  }
}

export const signOutController = async (req, res, next) => {
  const { refresh_token } = req.cookies

  try {
    await RefreshToken.deleteOne({ token: refresh_token })

    // Clear access_token and refresh_token cookies
    res.clearCookie('access_token')
    res.clearCookie('refresh_token')

    res.json({ message: SIGNOUT_MESSAGES.SUCCESS })
  } catch (error) {
    next(error)
  }
}
