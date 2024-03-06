import { Request, Response } from 'express'
import { pick } from 'lodash'
import path from 'path'
import { message } from '~/constants/message'
import { TokenPayLoad } from '~/models/request/users.request'
import databaseServices from '~/services/database.services'
import mp3Service from '~/services/mp3.services'
import { FILE_MUSIC } from '~/utils/path'
export const uploadmp3Controller = async (req: Request, res: Response) => {
  const { user_id } = req.decode_access_token as TokenPayLoad
  const result = await mp3Service.handleMp3({ req, user_id })
  return res.status(200).json({ result })
}
export const getMpPostman3Controller = async (req: Request, res: Response) => {
  const { name } = req.params
  const newName = name + '.mp3'
  return res.sendFile(path.resolve(FILE_MUSIC, newName))
}

export const getMp3Controller = async (req: Request, res: Response) => {
  const { name } = req.params
  const result = (await databaseServices.music.findOne({ music_name: name })) as object
  const output = pick(result, 'music_name')
  // return res.sendFile(path.resolve(FILE_MUSIC, name))
  return res.status(200).json({ message: 'success', output })
}
