import { padStart, random } from 'lodash'
import { parsePhoneNumber } from 'libphonenumber-js'

export const toE164 = (phone: string) => parsePhoneNumber(phone, 'US').format('E.164')
export const generateLoginToken = () => padStart(`${random(0, 9999)}`, 4, '0')
