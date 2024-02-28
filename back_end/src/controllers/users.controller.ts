import { Request, Response } from 'express'
import {
  ReqBodyForgotPassword,
  ReqBodyLogin,
  ReqBodyLogout,
  ReqBodyRegister,
  ReqBodyResetForgotPassword,
  ReqBodyVerifyEmail,
  TokenPayLoad
} from '~/models/request/users.request'
import { ParamsDictionary } from 'express-serve-static-core'
import usersService from '~/services/users.services'
import { message } from '~/constants/message'
import { Users } from '~/models/schemas/users.schemas'
import databaseServices from '~/services/database.services'
import { ObjectId } from 'mongodb'
import { decodePassword, hashPassword } from '~/utils/bcrypt'
import { check } from 'express-validator'

export const registerUsersController = async (req: Request<ParamsDictionary, any, ReqBodyRegister>, res: Response) => {
  const result = await usersService.registerUsers(req.body)
  res.status(200).json({ message: message.REGISTER_SUCCESS, result })
}

export const loginUsersController = async (req: Request<ParamsDictionary, any, ReqBodyLogin>, res: Response) => {
  // const result = await usersService.loginUsers(req.body)
  const user = req.user as Users
  const user_id = user._id?.toString() as string
  const { verify, authorized_user } = user
  const result = await usersService.loginUsers({ user_id, verify, authorized_user })
  res.status(200).json({ message: message.LOGIN_SUCCESS, result })
}
export const logoutUsersController = async (req: Request<ParamsDictionary, any, ReqBodyLogout>, res: Response) => {
  const { refresh_token } = req.body
  const result = await usersService.logoutUsers(refresh_token)
  res.json({ message: message.LOGOUT_SUCCESS, result })
}
export const verifyEmailUsersController = async (
  req: Request<ParamsDictionary, any, ReqBodyVerifyEmail>,
  res: Response
) => {
  const { user_id, verify, authorized_user } = req.decode_verify_email as TokenPayLoad
  const user = await databaseServices.users.findOne({ _id: new ObjectId(user_id) })
  // console.log(user)
  if (!user) {
    return res.status(404).json({ message: message.USER_NOT_FOUND })
  }
  if (user.verify_email_token === ' ') {
    return res.json({ message: message.EMAIL_IS_VERIFED })
  }
  const result = await usersService.verifyEmailUsers({ user_id, verify, authorized_user })
  return res.status(200).json({ message: message.EMAIL_IS_VERIFED, result })
}

export const resendVerifyEmailUsersController = async (req: Request, res: Response) => {
  const { user_id, verify, authorized_user } = req.decode_access_token as TokenPayLoad
  // console.log(user)
  const result = await usersService.resendVerifyEmailUsers({ user_id, verify, authorized_user })
  return res.json({ message: message.RESEND_VERIFY_EMAIL_USERS, result })
}

export const forgotPasswordUsersController = async (
  req: Request<ParamsDictionary, any, ReqBodyForgotPassword>,
  res: Response
) => {
  const { _id, verify, authorized_user } = req.user as Users
  const user_id = _id?.toString() as string
  if (verify !== 1) {
    return res.status(400).json({ message: message.EMAIL_NOT_VERIFIED })
  }
  const result = await usersService.forgotPasswordUsers({ user_id, verify, authorized_user })
  return res.status(200).json({ message: message.FORGOT_PASSWORD_SUCCESS, result })
}

export const resetforgotPasswordUsersController = async (
  req: Request<ParamsDictionary, any, ReqBodyResetForgotPassword>,
  res: Response
) => {
  const { user_id, verify, authorized_user } = req.decode_forgot_password_token as TokenPayLoad
  const { password } = req.body
  const user = await databaseServices.users.findOne({ _id: new ObjectId(user_id) })
  console.log(user)
  const hash_password_data = user?.password as string
  console.log('hash_password_old:', hash_password_data)
  // const hash_password_new = await hashPassword(password)
  // console.log('hash_password:', hash_password_new)

  const check_password = await decodePassword(password, hash_password_data)
  console.log(check_password)
  if (check_password) {
    return res.status(404).json({ message: message.PASSWORD_NEW_SAME_PASSWORD_OLD })
  }
  const result = await usersService.resetForgotPasswordUsers({ user_id, verify, authorized_user, password })
  return res.status(200).json({ message: message.RESET_FORGOT_PASSWORD_SUCCESS, result })
}
