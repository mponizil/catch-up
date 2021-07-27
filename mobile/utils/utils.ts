import { parsePhoneNumber } from 'libphonenumber-js'

export const toE164 = (phone: string) =>
  parsePhoneNumber(phone, 'US').format('E.164')
