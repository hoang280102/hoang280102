import { Request } from 'express'
import Users from './models/schemas/User.schema'
import { TokenPayLoad } from './models/request/user.request'

declare module 'express' {
  export interface Request {
    user?: Users
    decode_access_token?: TokenPayLoad
  }
}
