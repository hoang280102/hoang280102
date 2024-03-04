import path from 'path'
import fs from 'fs'
import { FILE_MUSIC } from './path'
export const createFile = () => {
  const file = FILE_MUSIC
  if (!fs.existsSync(file)) {
    fs.mkdirSync(file, { recursive: true })
  }
}
