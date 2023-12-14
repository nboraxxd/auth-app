import jwt from 'jsonwebtoken'
import capitalize from 'lodash/capitalize'

import HTTP_STATUS from '@/constants/httpStatus'
import { ErrorWithStatus } from '@/models/Errors'
import { ACCESS_TOKEN_MESSAGES } from '@/constants/message'
import { envConfig } from '@/constants/config'

export function signToken({ payload, privateKey, option = { algorithm: 'HS256' } }) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, privateKey, option, (err, token) => {
      if (err) {
        throw reject(err)
      }
      resolve(token)
    })
  })
}

export function verifyToken({ token, secretOrPublicKey }) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretOrPublicKey, (err, decoded) => {
      if (err) {
        throw reject(err)
      }
      resolve(decoded)
    })
  })
}

export async function verifyAccessToken(access_token, req) {
  if (!access_token) {
    throw new ErrorWithStatus({
      message: ACCESS_TOKEN_MESSAGES.IS_REQUIRED,
      statusCode: HTTP_STATUS.UNAUTHORIZED,
    })
  }

  try {
    const decoded_access_token = await verifyToken({
      token: access_token,
      secretOrPublicKey: envConfig.jwtSecretAccessToken,
    })

    if (req) {
      req.decoded_access_token = decoded_access_token
      return true
    }

    return decoded_access_token
  } catch (error) {
    throw new ErrorWithStatus({
      message: capitalize(error.message),
      statusCode: HTTP_STATUS.UNAUTHORIZED,
    })
  }
}
