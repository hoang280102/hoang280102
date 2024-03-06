import { Request, Response } from 'express'
import { pick } from 'lodash'
import { TokenPayLoad } from '~/models/request/users.request'
import databaseServices from '~/services/database.services'
import videoService from '~/services/video.services'

export const uploadVideoController = async (req: Request, res: Response) => {
  const { user_id } = req.decode_access_token as TokenPayLoad
  const result = await videoService.handlevideo({ req, user_id })
  return res.status(200).json({ result })
}

export const getVideoController = async (req: Request, res: Response) => {
  const { name } = req.params
  const result = (await databaseServices.video.findOne({ video_name: name })) as object
  const output = pick(result, 'video_name')
  // return res.sendFile(path.resolve(FILE_MUSIC, name))
  return res.status(200).json({ message: 'success', output })
}
