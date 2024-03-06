import { ObjectId } from 'mongodb'

interface VideoType {
  _id?: ObjectId
  user_id: ObjectId // _id nguoi dung
  video_name: string
  create_at?: Date
}
export class Video {
  _id?: ObjectId
  user_id: ObjectId // _id nguoi dung
  video_name: string
  create_at?: Date
  constructor(follow: VideoType) {
    ;(this._id = follow._id ?? new ObjectId()), (this.user_id = follow.user_id)
    this.video_name = follow.video_name
    this.create_at = follow.create_at ?? new Date()
  }
}
