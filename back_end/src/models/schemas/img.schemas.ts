import { ObjectId } from 'mongodb'

interface ImgType {
  _id?: ObjectId
  user_id: ObjectId // _id nguoi dung
  img_name: string
  create_at?: Date
}
export class Img {
  _id?: ObjectId
  user_id: ObjectId // _id nguoi dung
  img_name: string
  create_at?: Date
  constructor(follow: ImgType) {
    ;(this._id = follow._id ?? new ObjectId()), (this.user_id = follow.user_id)
    this.img_name = follow.img_name
    this.create_at = follow.create_at ?? new Date()
  }
}
