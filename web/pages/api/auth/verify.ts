import nc from 'next-connect'
import { ApiRequest, ApiResponse } from '../../../types/api'
import base from '../../../middleware/base'
import passport from '../../../lib/passport'

const handler = nc()

handler
  .use(base)
  .post(
    passport.authenticate('sms-token'),
    (req: ApiRequest, res: ApiResponse) => {
      res.json({ user: req.user })
    }
  )

export default handler
