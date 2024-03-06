import path from 'path'
import fs from 'fs'
import { FILE_IMAGES, FILE_MUSIC, FILE_VIDEOS } from './path'
export const createFile = () => {
  const files = [FILE_MUSIC, FILE_IMAGES, FILE_VIDEOS]
  files.forEach((file) => {
    if (!fs.existsSync(file)) {
      fs.mkdirSync(file, { recursive: true })
    }
  })
}
