import HTTP_STATUS from '@/constants/httpStatus'
import { VALIDATION_MESSAGES } from '@/constants/message'

export class ErrorWithStatus {
  message
  statusCode
  constructor({ message, statusCode }) {
    this.message = message
    this.statusCode = statusCode
  }
}

export class RequiredFieldError {
  message
  fieldRequired
  constructor({ message, fieldRequired }) {
    this.message = message
    this.fieldRequired = fieldRequired
  }
}

export class EntityError extends ErrorWithStatus {
  errors
  constructor({ message = VALIDATION_MESSAGES.ERROR, errors }) {
    super({ message, statusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY })
    this.errors = errors
  }
}
