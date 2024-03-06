import { ObjectId } from 'mongodb'

interface MusicType {
  _id?: ObjectId
  user_id: ObjectId // _id nguoi dung
  music_name: string
  create_at?: Date
}
export class Music {
  _id?: ObjectId
  user_id: ObjectId // _id nguoi dung
  music_name: string
  create_at?: Date
  constructor(follow: MusicType) {
    ;(this._id = follow._id ?? new ObjectId()), (this.user_id = follow.user_id)
    this.music_name = follow.music_name
    this.create_at = follow.create_at ?? new Date()
  }
}
