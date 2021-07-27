// https://github.com/nextauthjs/next-auth/issues/709#issuecomment-784077142

import { padStart, random } from 'lodash'
import NextAuth from 'next-auth'
import Providers, { EmailConfig } from 'next-auth/providers'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { parsePhoneNumber } from 'libphonenumber-js'
import prisma from '../../../lib/prisma'
import { twilio, fromPhoneNumber } from '../../../lib/twilio'

const toE164 = (phone: string) => parsePhoneNumber(phone, 'US').format('E.164')
const generateVerificationToken = () => padStart(`${random(0, 9999)}`, 4, '0')

type EmailOptions = Partial<EmailConfig> & {
  generateVerificationToken?: () => string
}

export default NextAuth({
  providers: [
    Providers.Email({
      generateVerificationToken,
      sendVerificationRequest: async ({ identifier: phone, token }) => {
        if (process.env.APP_ENVIRONMENT === 'local') {
          return console.log(`(sms) Your Catch Up login code is ${token}`)
        }
        await twilio.messages.create({
          body: `Your Catch Up login code is ${token}`,
          from: fromPhoneNumber,
          to: toE164(phone),
        })
      },
    } as EmailOptions),
  ],
  adapter: PrismaAdapter(prisma),
})
