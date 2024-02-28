import { Request } from 'express'
import Users from './models/schemas/User.schema'
import { TokenPayLoad } from './models/request/user.request'

declare module 'express' {
  interface Request {
    user?: Users
    decode_access_token?: TokenPayLoad
    decode_refresh_token?: TokenPayLoad
    decode_verify_email?: TokenPayLoad
    decode_forgot_password_token?: TokenPayLoad
  }
}
