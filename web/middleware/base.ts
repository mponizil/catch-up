import nc from 'next-connect'
import session from 'express-session'
import passport from '../lib/passport'

const auth = nc()
  .use(
    session({
      resave: false,
      saveUninitialized: false,
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

export default auth
