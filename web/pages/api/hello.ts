import nc from 'next-connect'
import auth from '../../middleware/auth'
import { ApiRequest, ApiResponse } from '../../types/api'

const handler = nc()

handler.use(auth).get((req: ApiRequest, res: ApiResponse) => {
  res.json({ user: req.user })
})

export default handler
