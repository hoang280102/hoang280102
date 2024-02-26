import { checkSchema } from 'express-validator'
import { message } from '~/constants/message'
import databaseServices from '~/services/database.services'
import usersService from '~/services/users.services'
import { decodePassword } from '~/utils/bcrypt'
import { decodeToken } from '~/utils/jwt'
import { validation } from '~/utils/validation'

export const RegisterValidator = validation(
  checkSchema(
    {
      name: {
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
      },
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
      password: {
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
      },
      confirm_password: {
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
      password: {
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
            const access_token = value.split(' ')[1]
            if (!access_token) {
              throw new Error(message.NOT_EXIST_ACCESS_TOKEN)
            }
            try {
              const decode_access_token = await decodeToken({
                token: access_token,
                secretKey: process.env.SECRET_ACCESS_KEY as string
              })
              req.decode_access_token = decode_access_token
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
            try {
              const decode_refresh_token = await decodeToken({
                token: value,
                secretKey: process.env.SECRET_REFRESH_KEY as string
              })
              req.decode_refresh_token = decode_refresh_token
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
