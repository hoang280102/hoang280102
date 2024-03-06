import { Request, Response } from 'express'
import { pick } from 'lodash'
import path from 'path'
import { message } from '~/constants/message'
import { TokenPayLoad } from '~/models/request/users.request'
import databaseServices from '~/services/database.services'
import imgService from '~/services/img.services'
import { FILE_IMAGES } from '~/utils/path'
export const uploadImgController = async (req: Request, res: Response) => {
  const { user_id } = req.decode_access_token as TokenPayLoad
  const result = await imgService.handleImg({ user_id, req })
  return res.status(200).json({ message: 'success', result })
}
// export const getImgController = async (req: Request, res: Response) => {
//   const { name } = req.params
//   const newName = name + '.jpg'
//   return res.sendFile(path.resolve(FILE_IMAGES, newName))
// }

export const getImgController = async (req: Request, res: Response) => {
  const { name } = req.params
  const result = (await databaseServices.img.findOne({ img_name: name })) as object
  const output = pick(result, 'img_name')
  // return res.sendFile(path.resolve(FILE_MUSIC, name))
  return res.status(200).json({ message: 'success', output })
}
