import { HttpStatusCode } from 'axios'
import { toast } from 'sonner'
import { isAxiosUnprocessableEntityError, isEmailNotFoundError } from '@/utils/common'

export function handleUnauthorizedError(error, setError) {
  const formError = error.response.data.errors
  if (isAxiosUnprocessableEntityError(error) && formError) {
    // Dùng Object.keys để lấy ra các key của formError object
    // Sau đó dùng forEach để lặp qua từng key và set error cho input tương ứng
    Object.keys(formError).forEach((key) => {
      setError(key, {
        message: formError[key].msg,
        type: 'server',
      })
    })
  }

  if (error.response.status === HttpStatusCode.InternalServerError) {
    toast.error(error.response.data.message)
  }
}

export function handleNotFoundError(error, setError) {
  if (isEmailNotFoundError(error)) {
    setError('email', {
      message: error.response.data.message,
      type: 'server',
    })
  }
}

export function handleInternalServerError(error) {
  if (error.response.status === HttpStatusCode.InternalServerError) {
    toast.error(error.response.data.message)
  }
}
