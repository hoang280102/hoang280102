import { Request } from 'express'

import databaseServices from './database.services'
import { Img } from '~/models/schemas/img.schemas'
import { ObjectId } from 'mongodb'
import { handleImgFiles } from '~/utils/file'
class ImgServices {
  async handleImg({ user_id, req }: { user_id: string; req: Request }) {
    const imgs = await handleImgFiles(req)
    const result = await Promise.all(
      imgs.map(async (img) => {
        // return img
        const { originalFilename } = img
        const newName = originalFilename?.split('.')[0] as string
        const newFileName = newName.split(' ').join('')
        try {
          const checkNameImg = await databaseServices.img.findOne({ img_name: newFileName })
          if (!checkNameImg) {
            await databaseServices.img.insertOne(
              new Img({
                user_id: new ObjectId(user_id),
                img_name: newFileName
              })
            )
          }
          return { url: `http://localhost:${process.env.PORT}/img/${newFileName}.jpg` }
        } catch (error) {
          throw new Error('My img is exist')
        }
      })
    )
    return result
  }
}

const imgService = new ImgServices()
export default imgService
