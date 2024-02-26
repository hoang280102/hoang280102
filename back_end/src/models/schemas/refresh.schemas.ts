import { ObjectId } from 'mongodb'
import { AuthorizedUserStatus, UserVerifyStatus } from '~/constants/enum'

interface RefreshTokenType {
  _id?: ObjectId
  token: string
  user_id: ObjectId
  verify?: UserVerifyStatus
  authorized_user?: AuthorizedUserStatus
  iat: number
  exp: number
}
export class RefreshToken {
  _id?: ObjectId
  token: string
  user_id: ObjectId
  verify?: UserVerifyStatus
  authorized_user?: AuthorizedUserStatus
  iat: Date
  exp: Date
  constructor(refreshtoken: RefreshTokenType) {
    this._id = refreshtoken._id ?? new ObjectId()
    this.token = refreshtoken.token
    this.user_id = refreshtoken.user_id
    this.verify = refreshtoken.verify ?? UserVerifyStatus.Unverified
    this.authorized_user = refreshtoken.authorized_user ?? AuthorizedUserStatus.Users
    this.iat = new Date(refreshtoken.iat * 1000)
    this.exp = new Date(refreshtoken.exp * 1000)
  }
}
