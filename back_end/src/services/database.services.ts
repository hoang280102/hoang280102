import 'dotenv/config'
import { Collection, Db, MongoClient } from 'mongodb'
import { Follow } from '~/models/schemas/follow.schemas'
import { Img } from '~/models/schemas/img.schemas'
import { Music } from '~/models/schemas/music.schemas'
import { RefreshToken } from '~/models/schemas/refresh.schemas'
import { Users } from '~/models/schemas/users.schemas'
import { Video } from '~/models/schemas/video.schemas'
const username = process.env.NAME_DATABASE
const password = process.env.PASSWORD_DATABASE
const uri = `mongodb+srv://${username}:${password}@webmusic.pn3bzpo.mongodb.net/?retryWrites=true&w=majority&appName=webmusic`
class DatabaseServices {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(process.env.COLLECTIONS_DATABASE)
  }
  async connect() {
    try {
      // await this.client.connect()
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log(error)
    }
  }
  get users(): Collection<Users> {
    return this.db.collection(process.env.COLLECTION_USERS_NAME as string)
  }
  get refresh_token(): Collection<RefreshToken> {
    return this.db.collection(process.env.COLLECTION_REFRESH_NAME as string)
  }
  get follow(): Collection<Follow> {
    return this.db.collection(process.env.COLLECTION_FOLLOW as string)
  }
  get music(): Collection<Music> {
    return this.db.collection(process.env.COLLECTION_MUSIC as string)
  }
  get img(): Collection<Img> {
    return this.db.collection(process.env.COLLECTION_IMG as string)
  }
  get video(): Collection<Video> {
    return this.db.collection(process.env.COLLECTION_VIDEO as string)
  }
}
const databaseServices = new DatabaseServices()
export default databaseServices
