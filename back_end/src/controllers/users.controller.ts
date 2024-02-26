import { Request, Response } from 'express'
import { ReqBodyLogin, ReqBodyLogout, ReqBodyRegister } from '~/models/request/users.request'
import { ParamsDictionary } from 'express-serve-static-core'
import usersService from '~/services/users.services'
import { message } from '~/constants/message'
import { Users } from '~/models/schemas/users.schemas'

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
  const result = await usersService.logoutUser(refresh_token)
  res.json({ message: message.LOGOUT_SUCCESS, result })
}
