import nextConnect from 'next-connect'
import passport from '../lib/passport'
import session from '../lib/session'
import { ApiRequest, ApiResponse } from '../types/api'

const auth = nextConnect()
  .use(
    session({
      name: 'sess',
      secret: process.env.SESSION_TOKEN_SECRET!,
      cookie: {
        maxAge: 60 * 60 * 24 * 365,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
      },
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .use((req: ApiRequest, res: ApiResponse, next) => {
    if (!req.user) {
      return res.status(401).json({
        message: 'unauthenticated',
      })
    }
    next()
  })

export default auth
