import { Request } from 'express'

import databaseServices from './database.services'
import { ObjectId } from 'mongodb'
import { handleVideoFiles } from '~/utils/file'
import { Video } from '~/models/schemas/video.schemas'
class VideoServices {
  async handlevideo({ user_id, req }: { user_id: string; req: Request }) {
    const mp4s = await handleVideoFiles(req)
    const result = await Promise.all(
      mp4s.map(async (mp4) => {
        const { originalFilename } = mp4
        const newName = originalFilename?.split('.')[0] as string
        const newFileName = newName.split(' ').join('')
        try {
          const checkNameVideo = await databaseServices.video.findOne({ video_name: newFileName })
          if (!checkNameVideo) {
            await databaseServices.video.insertOne(
              new Video({
                user_id: new ObjectId(user_id),
                video_name: newFileName
              })
            )
          }
          return { url: `http://localhost:${process.env.PORT}/img/${newFileName}.mp4` }
        } catch (error) {
          throw new Error('My img is exist')
        }
      })
    )
    return result
  }
}

const videoService = new VideoServices()
export default videoService
