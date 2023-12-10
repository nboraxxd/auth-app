import HTTP_STATUS from '@/constants/httpStatus'
import { SIGNUP_MESSAGES } from '@/constants/message'
import User from '@/models/auth.model'

export async function signUpController(req, res, next) {
  const { username, email, password, confirm_password } = req.body

  try {
    const result = await User.create({
      username,
      email,
      password,
      confirm_password,
    })

    res.status(HTTP_STATUS.CREATED).json({ message: SIGNUP_MESSAGES.SUCCESS, result })
  } catch (error) {
    next(error)
  }
}
