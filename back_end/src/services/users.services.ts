import { ReqBodyRegister } from '~/models/request/users.request'
import databaseServices from './database.services'
import { Users } from '~/models/schemas/users.schemas'
import { hashPassword } from '~/utils/bcrypt'
import { createToken, decodeToken } from '~/utils/jwt'
import { AuthorizedUserStatus, UserVerifyStatus } from '~/constants/enum'
import { ObjectId } from 'mongodb'
import { RefreshToken } from '~/models/schemas/refresh.schemas'
import { message } from '~/constants/message'

class UsersService {
  private async signAccessToken({
    user_id,
    verify,
    authorized_user
  }: {
    user_id: string
    verify: UserVerifyStatus
    authorized_user: AuthorizedUserStatus
  }) {
    return await createToken({
      payload: {
        user_id,
        verify: UserVerifyStatus.Unverified,
        authorized_user: AuthorizedUserStatus.Users
      },
      secretKey: process.env.SECRET_ACCESS_KEY as string,
      options: {
        expiresIn: process.env.EXPIRES_IN_ACCESS_KEY as string
      }
    })
  }
  private async signRefreshToken({
    user_id,
    verify,
    authorized_user
  }: {
    user_id: string
    verify: UserVerifyStatus
    authorized_user: AuthorizedUserStatus
  }) {
    return await createToken({
      payload: {
        user_id,
        verify: UserVerifyStatus.Unverified,
        authorized_user: AuthorizedUserStatus.Users
      },
      secretKey: process.env.SECRET_REFRESH_KEY as string,
      options: {
        expiresIn: process.env.EXPIRES_IN_REFRESH_KEY as string
      }
    })
  }
  private async signRefreshTokenAndAccessToken({
    user_id,
    verify,
    authorized_user
  }: {
    user_id: string
    verify: UserVerifyStatus

    authorized_user: AuthorizedUserStatus
  }) {
    return await Promise.all([
      this.signAccessToken({ user_id, verify, authorized_user }),
      this.signRefreshToken({ user_id, verify, authorized_user })
    ])
  }
  async checkEmailExist(email: string) {
    const user = await databaseServices.users.findOne({ email })
    return Boolean(user)
  }
  async registerUsers(payload: ReqBodyRegister) {
    const _id = new ObjectId()
    const user_id = _id.toString()
    await databaseServices.users.insertOne(
      new Users({
        ...payload,
        password: await hashPassword(payload.password)
      })
    )
    const [access_token, refresh_token] = await this.signRefreshTokenAndAccessToken({
      user_id,
      verify: UserVerifyStatus.Unverified,
      authorized_user: AuthorizedUserStatus.Users
    })
    const { iat, exp } = await decodeToken({
      token: refresh_token,
      secretKey: process.env.SECRET_REFRESH_KEY as string
    })
    await databaseServices.refresh_token.insertOne(
      new RefreshToken({ user_id: new ObjectId(user_id), token: refresh_token, iat, exp })
    )
    return { access_token, refresh_token }
  }
  async loginUsers({
    user_id,
    verify,
    authorized_user
  }: {
    user_id: string
    verify: UserVerifyStatus
    authorized_user: AuthorizedUserStatus
  }) {
    const [access_token, refresh_token] = await this.signRefreshTokenAndAccessToken({
      user_id,
      verify: UserVerifyStatus.Unverified,
      authorized_user: AuthorizedUserStatus.Users
    })
    const { iat, exp } = await decodeToken({
      token: refresh_token,
      secretKey: process.env.SECRET_REFRESH_KEY as string
    })
    await databaseServices.refresh_token.insertOne(
      new RefreshToken({ user_id: new ObjectId(user_id), token: refresh_token, iat, exp })
    )
    return { access_token, refresh_token }
  }
  async logoutUser(refresh_token: string) {
    await databaseServices.refresh_token.deleteOne({ token: refresh_token })
    return { message: message.LOGOUT_SUCCESS }
  }
}

const usersService = new UsersService()
export default usersService
