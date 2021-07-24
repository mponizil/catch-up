import Twilio from 'twilio'

const accountSid = process.env.TWILIO_ACCOUNT_SID!
const authToken = process.env.TWILIO_AUTH_TOKEN!

export const twilio = Twilio(accountSid, authToken)

export const fromPhoneNumber = process.env.TWILIO_FROM_PHONE_NUMBER!
