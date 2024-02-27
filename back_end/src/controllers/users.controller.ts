import { Request, Response } from 'express'
import {
  ReqBodyLogin,
  ReqBodyLogout,
  ReqBodyRegister,
  ReqBodyVerifyEmail,
  TokenPayLoad
} from '~/models/request/users.request'
import { ParamsDictionary } from 'express-serve-static-core'
import usersService from '~/services/users.services'
import { message } from '~/constants/message'
import { Users } from '~/models/schemas/users.schemas'
import databaseServices from '~/services/database.services'
import { ObjectId } from 'mongodb'

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
  const { user_id } = req.decode_verify_email as TokenPayLoad
  const user = await databaseServices.users.findOne({ _id: new ObjectId(user_id) })
  // console.log(user)
  if (!user) {
    return res.status(404).json({ message: message.USER_NOT_FOUND })
  }
  if (user.verify_email_token === ' ') {
    return res.json({ message: message.EMAIL_IS_VERIFED })
  }
  const result = await usersService.verifyEmailUsers(user_id)
  return res.status(200).json({ message: message.EMAIL_IS_VERIFED, result })
}

export const resendVerifyEmailUsersController = async (req: Request, res: Response) => {
  const { user_id, verify, authorized_user } = req.decode_access_token as TokenPayLoad
  // console.log(user)
  const result = await usersService.resendVerifyEmailUsers({ user_id, verify, authorized_user })
  return res.json({ message: message.RESEND_VERIFY_EMAIL_USERS, result })
}
