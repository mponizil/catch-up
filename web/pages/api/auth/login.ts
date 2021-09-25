import nc from 'next-connect'
import { padStart, random } from 'lodash'
import { parsePhoneNumber } from 'libphonenumber-js'
import { DateTime } from 'luxon'
import base from '../../../middleware/base'
import { ApiRequest, ApiResponse } from '../../../types/api'
import prisma from '../../../lib/prisma'
import { twilio, fromPhoneNumber } from '../../../lib/twilio'

const toE164 = (phone: string) => parsePhoneNumber(phone, 'US').format('E.164')
const generateVerificationToken = () => padStart(`${random(0, 9999)}`, 4, '0')

const handler = nc()

handler.use(base).post(async (req: ApiRequest, res: ApiResponse) => {
  const user = await prisma.user.findUnique({
    where: {
      phone: req.body.phone,
    },
  })
  if (!user) {
    await prisma.user.create({
      data: {
        phone: req.body.phone,
      },
    })
  }
  const token = generateVerificationToken()
  await prisma.verificationRequest.create({
    data: {
      identifier: req.body.phone,
      token,
      expires: DateTime.local().plus({ minutes: 10 }).toJSDate(),
    },
  })
  if (process.env.APP_ENVIRONMENT === 'local') {
    console.log(`(sms) Your Catch Up login code is ${token}`)
    return res.status(201).json({ message: 'verification code sent' })
  }
  await twilio.messages.create({
    body: `Your Catch Up login code is ${token}`,
    from: fromPhoneNumber,
    to: toE164(req.body.phone),
  })
  res.status(201).json({ message: 'verification code sent' })
})

export default handler
