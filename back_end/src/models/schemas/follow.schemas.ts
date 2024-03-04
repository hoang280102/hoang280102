import { ObjectId } from 'mongodb'

interface FollowType {
  _id?: ObjectId
  user_id: ObjectId // _id nguoi dung
  followed_user_id: ObjectId // _id nguoi duoc follow
  create_at?: Date
}
export class Follow {
  _id?: ObjectId
  user_id: ObjectId // _id nguoi dung
  followed_user_id: ObjectId // _id nguoi duoc follow
  create_at?: Date
  constructor(follow: FollowType) {
    ;(this._id = follow._id ?? new ObjectId()), (this.user_id = follow.user_id)
    this.followed_user_id = follow.followed_user_id
    this.create_at = follow.create_at ?? new Date()
  }
}
