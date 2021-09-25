import nc from 'next-connect'
import auth from '../../../middleware/auth'
import { ApiRequest, ApiResponse } from '../../../types/api'

const handler = nc()

handler.use(auth).delete((req: ApiRequest, res: ApiResponse) => {
  req.logOut()
  res.status(204).end()
})

export default handler
