import { ParamSchema, checkSchema } from 'express-validator'
import { message } from '~/constants/message'
import databaseServices from '~/services/database.services'
import usersService from '~/services/users.services'
import { decodePassword } from '~/utils/bcrypt'
import { decodeToken } from '~/utils/jwt'
import { validation } from '~/utils/validation'
import { NextFunction, Request } from 'express'
import { TokenPayLoad } from '~/models/request/users.request'
import { UserVerifyStatus } from '~/constants/enum'
import { ObjectId } from 'mongodb'
import { Users } from '~/models/schemas/users.schemas'

export const passwordSchema: ParamSchema = {
  notEmpty: {
    errorMessage: message.NOT_EMPTY
  },
  trim: true,
  isString: {
    errorMessage: message.STRING
  },
  isStrongPassword: {
    errorMessage: message.IS_STRONG_PASSWORD
  }
}

export const confirm_passwordSchema: ParamSchema = {
  notEmpty: {
    errorMessage: message.NOT_EMPTY
  },
  trim: true,
  isString: {
    errorMessage: message.STRING
  },
  isStrongPassword: {
    errorMessage: message.IS_STRONG_CONFIRM_PASSWORD
  },
  custom: {
    options: async (value: string, { req }) => {
      if (value !== req.body.password) {
        throw new Error(message.PASSWORD_DIFFERENT_CONFIRM_PASSWORD)
      }
      return true
    }
  }
}
export const nameSchema: ParamSchema = {
  notEmpty: {
    errorMessage: message.NOT_EMPTY
  },
  trim: true,
  isLength: {
    options: {
      min: 6,
      max: 30
    },
    errorMessage: message.NAME_LENGTH
  },
  isString: {
    errorMessage: message.STRING
  }
}

export const RegisterValidator = validation(
  checkSchema(
    {
      name: nameSchema,
      email: {
        notEmpty: {
          errorMessage: message.NOT_EMPTY
        },
        isEmail: {
          errorMessage: message.IS_EMAIL
        },
        trim: true,
        isString: {
          errorMessage: message.STRING
        },
        custom: {
          options: async (value: string, { req }) => {
            const user = await usersService.checkEmailExist(value)
            if (user) {
              throw new Error(message.EMAIL_IS_EXIST)
            }
            return true
          }
        }
      },
      password: passwordSchema,
      confirm_password: confirm_passwordSchema
    },
    ['body']
  )
)
export const LoginValidator = validation(
  checkSchema(
    {
      email: {
        notEmpty: {
          errorMessage: message.NOT_EMPTY
        },
        isEmail: {
          errorMessage: message.IS_EMAIL
        },
        trim: true,
        isString: {
          errorMessage: message.STRING
        },
        custom: {
          options: async (value: string, { req }) => {
            if (!value) {
              throw new Error()
            }
            const user = await databaseServices.users.findOne({ email: value })
            if (!user) {
              throw new Error(message.EMAIL_IS_NOT_EXIST)
            }
            const checkPassword = await decodePassword(req.body.password, user.password)
            if (!checkPassword) {
              throw new Error(message.PASSWORD_IS_WRONG)
            }
            req.user = user
            // console.log('user:', user)
            return true
          }
        }
      },
      password: passwordSchema
    },
    ['body']
  )
)

export const AccessValidator = validation(
  checkSchema(
    {
      Authorization: {
        notEmpty: {
          errorMessage: message.NOT_EMPTY
        },
        isString: {
          errorMessage: message.STRING
        },
        custom: {
          options: async (value: string, { req }) => {
            if (!value) {
              throw new Error()
            }
            const access_token = value.split(' ')[1]
            if (!access_token) {
              throw new Error(message.NOT_EXIST_ACCESS_TOKEN)
            }
            try {
              const decode_access_token = await decodeToken({
                token: access_token,
                secretKey: process.env.SECRET_ACCESS_KEY as string
              })
              ;(req as Request).decode_access_token = decode_access_token
              // console.log(decode_access_token)
            } catch (error) {
              throw new Error()
            }
            return true
          }
        }
      }
    },
    ['headers']
  )
)
export const RefreshValidator = validation(
  checkSchema(
    {
      refresh_token: {
        notEmpty: {
          errorMessage: message.NOT_EMPTY
        },
        trim: true,
        isString: {
          errorMessage: message.STRING
        },
        custom: {
          options: async (value: string, { req }) => {
            if (!value) {
              throw new Error()
            }
            try {
              const decode_refresh_token = await decodeToken({
                token: value,
                secretKey: process.env.SECRET_REFRESH_KEY as string
              })
              ;(req as Request).decode_refresh_token = decode_refresh_token
              // console.log('req.decode_refresh_token:', req.decode_access_token)
              // console.log('decode_refresh_token:', decode_refresh_token)
            } catch (error) {
              throw new Error()
            }
          }
        }
      }
    },
    ['body']
  )
)

export const VerifyEmailValidator = validation(
  checkSchema({
    verify_email_token: {
      notEmpty: {
        errorMessage: message.NOT_EMPTY
      },
      trim: true,
      isString: {
        errorMessage: message.STRING
      },
      custom: {
        options: async (value: string, { req }) => {
          if (!value) {
            throw new Error()
          }
          try {
            const decode_verify_email = await decodeToken({
              token: value,
              secretKey: process.env.SECRET_EMAIL_VERIFY_KEY as string
            })
            ;(req as Request).decode_verify_email = decode_verify_email
          } catch (error) {
            throw new Error()
          }
          return true
        }
      }
    }
  })
)

export const ForgotPasswordValidator = validation(
  checkSchema(
    {
      email: {
        notEmpty: {
          errorMessage: message.NOT_EMPTY
        },
        isEmail: {
          errorMessage: message.IS_EMAIL
        },
        trim: true,
        isString: {
          errorMessage: message.STRING
        },
        custom: {
          options: async (value: string, { req }) => {
            if (!value) {
              throw new Error()
            }
            try {
              const user = await databaseServices.users.findOne({ email: value })
              if (!user) {
                throw new Error(message.EMAIL_IS_NOT_EXIST)
              }
              req.user = user
              // console.log(user)
            } catch (error) {
              throw new Error()
            }

            return true
          }
        }
      }
    },
    ['body']
  )
)
export const ResetForgotPasswordValidator = validation(
  checkSchema(
    {
      forgot_password_token: {
        notEmpty: {
          errorMessage: message.NOT_EMPTY
        },
        trim: true,
        isString: {
          errorMessage: message.STRING
        },
        custom: {
          options: async (value: string, { req }) => {
            if (!value) {
              throw new Error()
            }
            try {
              const decode_forgot_password_token = await decodeToken({
                token: value,
                secretKey: process.env.SECRET_FORGOT_PASSWORD_KEY as string
              })
              ;(req as Request).decode_forgot_password_token = decode_forgot_password_token
            } catch (error) {
              throw new Error()
            }
          }
        }
      },
      password: passwordSchema,
      confirm_password: confirm_passwordSchema
    },
    ['body']
  )
)

export const CheckVerifyEmail = (req: Request, res: Response, next: NextFunction) => {
  const user = req.decode_access_token as TokenPayLoad
  const { verify } = user
  if (verify !== UserVerifyStatus.Verified) {
    return new Error("'User is not verified'")
  }
  next()
}
export const ChangePasswordValidator = validation(
  checkSchema(
    {
      old_password: {
        ...passwordSchema,
        custom: {
          options: async (value: string, { req }) => {
            const user = req.decode_access_token as TokenPayLoad
            const { user_id } = user
            const result = (await databaseServices.users.findOne({ _id: new ObjectId(user_id) })) as Users
            const { password } = result
            const check_password = await decodePassword(value, password)
            if (!check_password) {
              throw new Error('Password is wrong')
            }
          }
        }
      },
      password: {
        ...passwordSchema,
        custom: {
          options: async (value: string, { req }) => {
            const user = req.decode_access_token as TokenPayLoad
            const { user_id } = user
            const result = (await databaseServices.users.findOne({ _id: new ObjectId(user_id) })) as Users
            const { password } = result
            const comparePassword = await decodePassword(value, password)
            if (comparePassword) {
              throw new Error(message.PASSWORD_NEW_SAME_PASSWORD_OLD)
            }
          }
        }
      },
      confirm_password: confirm_passwordSchema
    },
    ['body']
  )
)

export const ChangeUserValidator = validation(
  checkSchema(
    {
      name: nameSchema
    },
    ['body']
  )
)

export const FollowUserValidator = validation(
  checkSchema(
    {
      user_id_followed: {
        notEmpty: {
          errorMessage: message.NOT_EMPTY
        },
        trim: true,
        isString: {
          errorMessage: message.STRING
        },
        custom: {
          options: async (value: string, { req }) => {
            const user_followered = await databaseServices.users.findOne({ _id: new ObjectId(value) })
            if (!user_followered) {
              throw new Error('User not found')
            }
            ;(req as Request).user_followered = user_followered
            return true
          }
        }
      }
    },
    ['body']
  )
)
