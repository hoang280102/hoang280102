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
  private async InsertRefreshToken({
    user_id,
    token,
    iat,
    exp
  }: {
    user_id: ObjectId
    token: string
    iat: number
    exp: number
  }) {
    return await databaseServices.refresh_token.insertOne(new RefreshToken({ user_id, token, iat, exp }))
  }
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
  private async signEmailVerifyToken({
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
      secretKey: process.env.SECRET_EMAIL_VERIFY_KEY as string,
      options: {
        expiresIn: process.env.EXPIRES_IN_EMAIL_VERIFY_KEY as string
      }
    })
  }
  async checkEmailExist(email: string) {
    const user = await databaseServices.users.findOne({ email })
    return Boolean(user)
  }
  async registerUsers(payload: ReqBodyRegister) {
    const _id = new ObjectId()
    const user_id = _id.toString()
    const verify_email_token = await this.signEmailVerifyToken({
      user_id,
      verify: UserVerifyStatus.Unverified,
      authorized_user: AuthorizedUserStatus.Users
    })
    await databaseServices.users.insertOne(
      new Users({
        ...payload,
        _id,
        verify_email_token,
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
    await this.InsertRefreshToken({ user_id: new ObjectId(user_id), token: refresh_token, iat, exp })
    // await databaseServices.refresh_token.insertOne(
    //   new RefreshToken({ user_id: new ObjectId(user_id), token: refresh_token, iat, exp })
    // )
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
    // await databaseServices.refresh_token.insertOne(
    //   new RefreshToken({ user_id: new ObjectId(user_id), token: refresh_token, iat, exp })
    // )
    await this.InsertRefreshToken({ user_id: new ObjectId(user_id), token: refresh_token, iat, exp })
    return { access_token, refresh_token }
  }
  async logoutUsers(refresh_token: string) {
    await databaseServices.refresh_token.deleteOne({ token: refresh_token })
    return { message: message.LOGOUT_SUCCESS }
  }
  async verifyEmailUsers(user_id: string) {
    const [token] = await Promise.all([
      this.signRefreshTokenAndAccessToken({
        user_id,
        verify: UserVerifyStatus.Verified,
        authorized_user: AuthorizedUserStatus.Users
      }),
      databaseServices.users.updateOne(
        { _id: new ObjectId(user_id) },
        {
          $set: {
            verify_email_token: ' ',
            verify: UserVerifyStatus.Verified
          },
          $currentDate: {
            update_at: true
          }
        }
      )
    ])
    const [access_token, refresh_token] = token
    const { iat, exp } = await decodeToken({
      token: refresh_token,
      secretKey: process.env.SECRET_REFRESH_KEY as string
    })
    // await databaseServices.refresh_token.insertOne(
    //   new RefreshToken({ user_id: new ObjectId(user_id), token: refresh_token, iat, exp })
    // )
    await this.InsertRefreshToken({ user_id: new ObjectId(user_id), token: refresh_token, iat, exp })
    return {
      access_token,
      refresh_token
    }
  }
  async resendVerifyEmailUsers({
    user_id,
    verify,
    authorized_user
  }: {
    user_id: string
    verify: UserVerifyStatus
    authorized_user: AuthorizedUserStatus
  }) {
    await databaseServices.users.updateOne(
      { _id: new ObjectId(user_id) },
      {
        $set: {
          verify_email_token: await this.signEmailVerifyToken({ user_id, verify, authorized_user })
        },
        $currentDate: {
          update_at: true
        }
      }
    )
    return true
  }
}

const usersService = new UsersService()
export default usersService
