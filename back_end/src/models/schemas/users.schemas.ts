import { ObjectId } from 'mongodb'
import { AuthorizedUserStatus, UserVerifyStatus } from '~/constants/enum'

interface UserType {
  _id?: ObjectId
  name: string
  email: string
  password: string
  forgot_password_token?: string
  verify_email_token?: string
  create_at?: Date
  update_at?: Date
  verify?: UserVerifyStatus
  authorized_user?: AuthorizedUserStatus
}
export class Users {
  _id?: ObjectId
  name: string
  email: string
  password: string
  forgot_password_token?: string
  verify_email_token?: string
  create_at?: Date
  update_at?: Date
  verify: UserVerifyStatus
  authorized_user: AuthorizedUserStatus
  constructor(users: UserType) {
    const date = new Date()
    const user_id = new ObjectId()
    this._id = users._id ?? user_id
    this.name = users.name
    this.email = users.email
    this.password = users.password
    this.forgot_password_token = users.forgot_password_token ?? ' '
    this.verify_email_token = users.verify_email_token ?? ' '
    this.create_at = users.create_at ?? date
    this.update_at = users.update_at ?? date
    this.verify = users.verify ?? UserVerifyStatus.Unverified
    this.authorized_user = users.authorized_user ?? AuthorizedUserStatus.Users
  }
}
