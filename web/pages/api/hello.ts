import nextConnect from 'next-connect'
import auth from '../../middleware/auth'
import { ApiRequest, ApiResponse } from '../../types/api'

const handler = nextConnect()

handler.use(auth).get((req: ApiRequest, res: ApiResponse) => {
  res.json({ user: req.user })
})

export default handler
