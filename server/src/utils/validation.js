import HTTP_STATUS from '@/constants/httpStatus'
import { EntityError, ErrorWithStatus, RequiredFieldError } from '@/models/Errors'
import { validationResult } from 'express-validator'

// sequential processing, stops running validations chain if the previous one fails.
export function validate(validation) {
  return async (req, _res, next) => {
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
      if (msg instanceof ErrorWithStatus && msg.statusCode !== HTTP_STATUS.UNPROCESSABLE_ENTITY) return next(msg)

      // Trả lỗi khi thiếu field phụ thuộc
      if (msg instanceof RequiredFieldError) {
        entityError.errors[msg.fieldRequired] = {
          msg: msg.message,
          path: msg.fieldRequired,
          type: 'custom',
          location: errorObject[key].location,
        }
        continue
      }

      entityError.errors[key] = errorObject[key]
    }

    next(entityError)
  }
}
