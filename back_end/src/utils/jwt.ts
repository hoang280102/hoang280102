import jwt, { SignOptions } from 'jsonwebtoken'
import { TokenPayLoad } from '~/models/request/users.request'
export const createToken = ({
  payload,
  secretKey,
  options = {
    algorithm: 'HS256'
  }
}: {
  payload: string | object | Buffer
  secretKey: string
  options?: SignOptions
}) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, secretKey, options, (err, result) => {
      if (err) throw reject(err)
      return resolve(result as string)
    })
  })
}
export const decodeToken = ({ token, secretKey }: { token: string; secretKey: string }) => {
  return new Promise<TokenPayLoad>((resolve, reject) => {
    jwt.verify(token, secretKey, (err, result) => {
      if (err) throw reject(err)
      return resolve(result as TokenPayLoad)
    })
  })
}
