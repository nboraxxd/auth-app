import jwt from 'jsonwebtoken'

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
