import { compact } from 'lodash'
import { parsePhoneNumber } from 'libphonenumber-js'

export interface IPerson {
  firstName?: string
  lastName?: string
}

export const toE164 = (phone: string) =>
  parsePhoneNumber(phone, 'US').format('E.164')

export const personName = ({ firstName, lastName }: IPerson) =>
  compact([firstName, lastName]).join(' ')
