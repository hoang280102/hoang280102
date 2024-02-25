import { Router } from 'express'
const userRouter = Router()

userRouter.post('/register', (req, res) => {
  res.json('hello')
})

export default userRouter
