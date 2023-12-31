import mongoose from 'mongoose'
import capitalize from 'lodash/capitalize'

import HTTP_STATUS from '@/constants/httpStatus'
import { VALIDATION_MESSAGES } from '@/constants/message'

export function defaultErrorHandler(err, _req, res, _next) {
  const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR
  const message = err.message || 'Internal server error'
  console.log('🍓 ERROR:', message)

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0]
    const value = err.keyValue[field]

    return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({
      message: VALIDATION_MESSAGES.ERROR,
      errors: {
        [field]: {
          msg: capitalize(field) + ' already exists',
          path: field,
          value,
        },
      },
    })
  }

  if (err instanceof mongoose.Error.ValidationError) {
    // Chỉ lấy message, path, value của error
    const modifiedErrors = Object.entries(err.errors).reduce((acc, [key, { message, path, value }]) => {
      acc[key] = { msg: message, path, value }
      return acc
    }, {})

    return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({
      message: VALIDATION_MESSAGES.ERROR,
      errors: modifiedErrors,
    })
  }

  res.status(statusCode).json({
    message,
    errors: err.errors,
  })
}
