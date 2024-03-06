import { Request } from 'express'
import { Mp3 } from '~/models/orther'
import { handleMp3Files } from '~/utils/file'
import 'dotenv/config'
import databaseServices from './database.services'
import { Music } from '~/models/schemas/music.schemas'
import { ObjectId } from 'mongodb'
import { MediaType } from '~/constants/enum'

class Mp3Service {
  async handleMp3({ req, user_id }: { req: Request; user_id: string }) {
    const mp3s = await handleMp3Files(req)
    const result: Mp3[] = await Promise.all(
      mp3s.map(async (mp3) => {
        const { originalFilename } = mp3

        const newName = originalFilename?.split('.')[0] as string
        const newFilename = newName.split(' ').join('')
        try {
          const checkName = await databaseServices.music.findOne({ music_name: newName })
          if (!checkName) {
            await databaseServices.music.insertOne(
              new Music({
                user_id: new ObjectId(user_id),
                music_name: newFilename
              })
            )
          }
          return { url: `http://localhost:${process.env.PORT}/mp3s/${newFilename}.mp3`, type: MediaType.Mp3 }
        } catch (error) {
          throw new Error('My song is exist')
        }
      })
    )
    return result
  }
}
const mp3Service = new Mp3Service()

export default mp3Service
