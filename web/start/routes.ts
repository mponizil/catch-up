import { DateTime } from 'luxon'
import Route from '@ioc:Adonis/Core/Route'
import Env from '@ioc:Adonis/Core/Env'
import Twilio from 'App/Services/Twilio'
import { generateLoginToken, toE164 } from 'App/Helpers/phone'
import User from 'App/Models/User'
import LoginToken from 'App/Models/LoginToken'

Route.post('auth/login', async ({ logger, request, response }) => {
  const phone = toE164(request.body().phone)
  const user = await User.findBy('phone', phone)
  if (!user) {
    await User.create({
      phone,
    })
  }
  const token = generateLoginToken()
  await LoginToken.create({
    identifier: phone,
    token,
    expiresAt: DateTime.local().plus({ minutes: 10 }),
  })
  if (Env.get('APP_ENV') === 'local') {
    logger.info(`(auth/login) Your Catch Up login code is ${token}`)
    return response.created({ message: 'login token sent' })
  }
  await Twilio.messages.create({
    body: `Your Catch Up login code is ${token}`,
    from: Env.get('TWILIO_FROM_PHONE_NUMBER'),
    to: toE164(phone),
  })
  return response.created({ message: 'login token sent' })
})

Route.post('auth/verify', async ({ auth, request }) => {
  const { token } = request.body()
  const phone = toE164(request.body().phone)
  const loginToken = await LoginToken.query()
    .where('identifier', phone)
    .andWhere('token', token)
    .first()
  if (!loginToken) {
    throw new Error("login token doesn't exist")
  }
  await loginToken.delete()
  if (loginToken.expiresAt < DateTime.local()) {
    throw new Error('login token is expired')
  }
  const user = await User.findBy('phone', phone)
  if (!user) {
    throw new Error("user doesn't exist")
  }
  await auth.login(user)
  return user
})

Route.get('auth/session', async ({ auth }) => auth.user).middleware('auth')

Route.post('auth/logout', async ({ auth }) => {
  await auth.logout()
  return {
    message: 'user logged out',
  }
})

Route.get('feed', async ({ auth }) => {
  const oneWeekAgo = DateTime.local().minus({ weeks: 1 })
  return auth
    .user!.related('contacts')
    .query()
    .preload('waves', (wavesQuery) => {
      wavesQuery.where('starts_at', '>', oneWeekAgo.toISO()).orderBy('starts_at', 'desc')
    })
}).middleware('auth')
