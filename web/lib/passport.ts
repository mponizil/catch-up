import { DateTime } from 'luxon'
import passport from 'passport'
import Custom from 'passport-custom'
import { User, VerificationRequest } from '@prisma/client'
import prisma from './prisma'

passport.serializeUser(function (user: User, done) {
  done(null, user.id)
})

passport.deserializeUser(async function (id: string, done) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  })
  done(null, user)
})

passport.use(
  'sms-token',
  new Custom.Strategy(async (req, done) => {
    const verificationRequest = await prisma.verificationRequest.findUnique({
      where: {
        identifier_token: { identifier: req.body.phone, token: req.body.token },
      },
    })
    if (!verificationRequest) {
      done(new Error("verification token doesn't exist"))
      return
    }
    if (verificationRequest.expires < DateTime.local().toJSDate()) {
      done(new Error('verification token is expired'))
      return
    }
    await prisma.verificationRequest.delete({
      where: { id: verificationRequest.id },
    })
    const user = await prisma.user.findUnique({
      where: { phone: req.body.phone },
    })
    if (!user) {
      done(new Error("user doesn't exist"))
      return
    }
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        phoneVerifiedAt: DateTime.local().toJSDate(),
      },
    })
    done(null, user)
  })
)

export default passport
