import HTTP_STATUS from '@/constants/httpStatus'
import { EntityError, ErrorWithStatus } from '@/models/Errors'
import { validationResult } from 'express-validator'

// sequential processing, stops running validations chain if the previous one fails.
export function validate(validation) {
  return async (req, res, next) => {
    await validation.run(req)

    const errors = validationResult(req)
    // Có lỗi là không empty, errors.isEmpty() return false. Không có lỗi là empty, errors.isEmpty() return true
    if (errors.isEmpty()) return next()

    // errors.array() xuất hiện chi tiết lỗi của từng kiểu validation
    // errors.mapped() xuất hiện lỗi gặp đầu tiên của từng field
    const errorObject = errors.mapped()
    const entityError = new EntityError({ errors: {} })

    for (const key in errorObject) {
      const { msg } = errorObject[key]

      // Trả về lỗi không thuộc lỗi của quá trình validate
      if (msg instanceof ErrorWithStatus && msg.status !== HTTP_STATUS.UNPROCESSABLE_ENTITY) return next(msg)

      entityError.errors[key] = errorObject[key]
    }

    next(entityError)
  }
}
