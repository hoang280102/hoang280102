import { ReqBodyChangeUser, ReqBodyFollowUser, ReqBodyRegister } from '~/models/request/users.request'
import databaseServices from './database.services'
import { Users } from '~/models/schemas/users.schemas'
import { hashPassword } from '~/utils/bcrypt'
import { createToken, decodeToken } from '~/utils/jwt'
import { AuthorizedUserStatus, TokenType, UserVerifyStatus } from '~/constants/enum'
import { ObjectId } from 'mongodb'
import { RefreshToken } from '~/models/schemas/refresh.schemas'
import { message } from '~/constants/message'
import { Follow } from '~/models/schemas/follow.schemas'

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
    return createToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken,
        verify,
        authorized_user
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
    return createToken({
      payload: {
        user_id,
        token_type: TokenType.RefreshToken,
        verify,
        authorized_user
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
        token_type: TokenType.EmailVerifyToken,
        verify,
        authorized_user
      },
      secretKey: process.env.SECRET_EMAIL_VERIFY_KEY as string,
      options: {
        expiresIn: process.env.EXPIRES_IN_EMAIL_VERIFY_KEY as string
      }
    })
  }
  private async signForgotPasswordToken({
    user_id,
    verify,
    authorized_user
  }: {
    user_id: string
    verify: UserVerifyStatus.Verified
    authorized_user: AuthorizedUserStatus
  }) {
    return await createToken({
      payload: {
        user_id,
        token_type: TokenType.ForgotPasswordToken,
        verify,
        authorized_user
      },
      secretKey: process.env.SECRET_FORGOT_PASSWORD_KEY as string,
      options: {
        expiresIn: process.env.EXPIRES_IN_FORGOT_PASSWORD_KEY as string
      }
    })
  }
  async checkEmailExist(email: string) {
    const user = await databaseServices.users.findOne({ email })
    return Boolean(user)
  }
  async returnAcessAndRefresh({
    user_id,
    verify,
    authorized_user
  }: {
    user_id: string
    verify: UserVerifyStatus
    authorized_user: AuthorizedUserStatus
  }) {
    const token = await this.signRefreshTokenAndAccessToken({ user_id, verify, authorized_user })
    const [access_token, refresh_token] = token
    const { iat, exp } = await decodeToken({
      token: refresh_token,
      secretKey: process.env.SECRET_REFRESH_KEY as string
    })
    await this.InsertRefreshToken({ user_id: new ObjectId(user_id), token: refresh_token, iat, exp })
    return { access_token, refresh_token }
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
    const token = await this.returnAcessAndRefresh({
      user_id,
      verify: UserVerifyStatus.Unverified,
      authorized_user: AuthorizedUserStatus.Users
    })

    return { token }
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
    const token = await this.returnAcessAndRefresh({
      user_id,
      verify,
      authorized_user
    })

    return { token }
  }
  async logoutUsers(refresh_token: string) {
    await databaseServices.refresh_token.deleteOne({ token: refresh_token })
    return { message: message.LOGOUT_SUCCESS }
  }
  async verifyEmailUsers({
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
          verify_email_token: ' ',
          verify: UserVerifyStatus.Verified
        },
        $currentDate: {
          update_at: true
        }
      }
    )
    const token = await this.returnAcessAndRefresh({
      user_id,
      verify: UserVerifyStatus.Verified,
      authorized_user
    })

    return { token }
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
          verify_email_token: await this.signEmailVerifyToken({
            user_id,
            verify: UserVerifyStatus.Unverified,
            authorized_user
          })
        },
        $currentDate: {
          update_at: true
        }
      }
    )
    return true
  }
  async forgotPasswordUsers({
    user_id,
    verify,
    authorized_user
  }: {
    user_id: string
    verify: UserVerifyStatus
    authorized_user: AuthorizedUserStatus
  }) {
    const forgot_password_token = await this.signForgotPasswordToken({
      user_id,
      verify: UserVerifyStatus.Verified,
      authorized_user
    })
    await databaseServices.users.updateOne(
      { _id: new ObjectId(user_id) },
      {
        $set: {
          forgot_password_token
        },
        $currentDate: {
          update_at: true
        }
      }
    )
    const token = await this.returnAcessAndRefresh({ user_id, verify, authorized_user })
    return { token }
  }
  async resetForgotPasswordUsers({
    user_id,
    verify,
    authorized_user,
    password
  }: {
    user_id: string
    verify: UserVerifyStatus
    authorized_user: AuthorizedUserStatus
    password: string
  }) {
    await databaseServices.users.updateOne(
      { _id: new ObjectId(user_id) },
      {
        $set: {
          forgot_password_token: ' ',
          password: await hashPassword(password)
        },
        $currentDate: {
          update_at: true
        }
      }
    )
    const token = await this.returnAcessAndRefresh({
      user_id,
      verify,
      authorized_user
    })
    return { token }
  }
  async changePassword({ user_id, new_password }: { user_id: string; new_password: string }) {
    await databaseServices.users.updateOne(
      { _id: new ObjectId(user_id) },
      {
        $set: {
          password: await hashPassword(new_password)
        },
        $currentDate: {
          update_at: true
        }
      }
    )
    return true
  }
  async changeUser({ user_id, payload }: { user_id: string; payload: ReqBodyChangeUser }) {
    const user = await databaseServices.users.findOneAndUpdate(
      { _id: new ObjectId(user_id) },
      {
        $set: {
          ...payload
        },
        $currentDate: {
          update_at: true
        }
      },
      {
        projection: {
          _id: 0,
          password: 0,
          forgot_password_token: 0,
          verify_email_token: 0
        }, // ko hiện ra _id , password, forgot_password_token, verify_email_token
        returnDocument: 'after' // trar về tài liệu sau khi cập nhật
      }
    )
    return user
  }
  async FollowUser({ user_id_follower, followed_user_id }: { user_id_follower: string; followed_user_id: string }) {
    await databaseServices.follow.insertOne(
      new Follow({
        user_id: new ObjectId(user_id_follower),
        followed_user_id: new ObjectId(followed_user_id)
      })
    )

    return true
  }
  async UnFollowUser(id_collection_follower: string) {
    await databaseServices.follow.deleteOne({ _id: new ObjectId(id_collection_follower) })
    return true
  }
}

const usersService = new UsersService()
export default usersService
