import nextConnect from 'next-connect'
import { ApiRequest, ApiResponse } from '../../../types/api'
import auth from '../../../middleware/auth'
import passport from '../../../lib/passport'

const handler = nextConnect()

handler
  .use(auth)
  .post(
    passport.authenticate('sms-token'),
    (req: ApiRequest, res: ApiResponse) => {
      res.json({ user: req.user })
    }
  )

export default handler
