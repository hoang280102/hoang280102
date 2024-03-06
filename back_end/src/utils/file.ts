import formidable, { File, Part } from 'formidable'
import { FILE_IMAGES, FILE_MUSIC, FILE_VIDEOS } from './path'
import { Request } from 'express'

export const handleMp3Files = (req: Request) => {
  const form = formidable({
    uploadDir: FILE_MUSIC,
    maxFiles: 4,
    maxFieldsSize: 200 * 1024 * 1024, //(200mb)
    maxTotalFileSize: 4 * 200 * 1024 * 1024,
    filter: function ({ name, originalFilename, mimetype }) {
      const valid = name === 'mp3' && Boolean(mimetype?.includes('audio/mpeg'))
      if (!valid) {
        console.log('error')
      }
      return valid
    },
    filename: function (name, ext, part, form) {
      const newName = name.split(' ').join('')
      const newFileName = `${newName}.mp3`
      return newFileName
    }
  })

  return new Promise<File[]>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err)
      // console.log('files.mp3:', files.mp3)
      resolve(files.mp3 as File[])
    })
  })
}

export const handleImgFiles = (req: Request) => {
  const form = formidable({
    uploadDir: FILE_IMAGES,
    maxFields: 4,
    maxFileSize: 20 * 1024 * 1024,
    maxTotalFileSize: 4 * 20 * 1024 * 1024,
    filename: function (name, ext, part, form) {
      const newName = name.split(' ').join('')
      const newFileName = `${newName}.jpg`
      return newFileName
    },
    filter: function ({ name, originalFilename, mimetype }) {
      console.log('mimetype:', mimetype)
      const valid = name === 'img' && Boolean(mimetype?.includes('image/jpeg'))
      if (!valid) {
        console.log('error')
      }
      return valid
    }
  })
  return new Promise<File[]>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err)
      resolve(files.img as File[])
    })
  })
}
export const handleVideoFiles = (req: Request) => {
  const form = formidable({
    uploadDir: FILE_VIDEOS,
    maxFields: 4,
    maxFileSize: 200 * 1024 * 1024,
    maxTotalFileSize: 4 * 200 * 1024 * 1024,
    filename: function (name, ext, part, form) {
      const newName = name.split(' ').join('')
      const newFileName = `${newName}.mp4`
      return newFileName
    },
    filter: function ({ name, originalFilename, mimetype }) {
      const valid = name === 'video' && Boolean(mimetype?.includes('video/mp4'))
      if (!valid) {
        console.log('error')
      }
      return valid
    }
  })
  return new Promise<File[]>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      // console.log('req:', req)
      // console.log('fields:', fields)
      // console.log('files:', files)
      if (err) reject(err)
      resolve(files.video as File[])
    })
  })
}
