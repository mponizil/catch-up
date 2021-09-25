import { DateTime } from 'luxon'
import config from './config'
import { toE164 } from './utils'

const sleep = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay))

export enum Status {
  Busy = 'busy',
  Free = 'free',
}

export interface IContact {
  id: string
  firstName: string
  lastName: string
  photoUrl: string
  status: Status
}

export interface ApiRequestOptions {
  method?: string
  body?: object
}

const api = async (endpoint: string, options: ApiRequestOptions = {}) => {
  const method = options.method || 'get'
  const body = options.body ? JSON.stringify(options.body) : undefined
  console.info(`(api) [${method}] ${endpoint} start`, body)
  const result = await fetch(`${config.api.host}${endpoint}`, {
    method,
    body,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  })
    .then((httpResponse) => {
      if (!httpResponse.ok) {
        console.warn('(api) response not ok', httpResponse.status)
      }
      return httpResponse
    })
    .then((httpResponse) => httpResponse.json())
  if (result?.errors) {
    throw new Error(result.errors)
  }
  console.info(`(api) [${method}] ${endpoint} result`, result)
  return result
}

const getSession = async () => api('/auth/session')

const login = async (phone: string) => {
  await api('/auth/login', {
    method: 'post',
    body: {
      phone: toE164(phone),
    },
  })
}

const logout = async () => {
  await api('/auth/logout', {
    method: 'post',
  })
}

const verifyPhone = async ({
  phone,
  token,
}: {
  phone: string
  token: string
}) =>
  api(`/auth/verify`, {
    method: 'post',
    body: {
      phone: toE164(phone),
      token,
    },
  })

const me = async () => {
  await sleep(200)
  return {
    id: 'misha-ponizil',
    firstName: 'Misha',
    lastName: 'Ponizil',
    photoUrl:
      'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/s320x320/123768498_278226950232755_2476923715086786316_n.jpg?tp=1&_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_ohc=3UTyey8jUfgAX_xZm_t&edm=ABfd0MgBAAAA&ccb=7-4&oh=bf1a31f84ea882fbb004a3e3d30dae3b&oe=60EE3EA4&_nc_sid=7bff83',
    status: Status.Free,
  }
}

const TEMP_ASSET_HOST = 'http://127.0.0.1:8081'
const feed = async () => {
  await sleep(500)
  return [
    {
      id: 'dan-shipper',
      firstName: 'Dan',
      lastName: 'Shipper',
      photoUrl: `${TEMP_ASSET_HOST}/dan.jpg`,
      status: Status.Busy,
      lastFree: {
        start: DateTime.local()
          .minus({ hours: 2, minutes: 8 })
          .minus({ minutes: 30 }),
        end: DateTime.local().minus({ hours: 2, minutes: 8 }),
      },
    },
    {
      id: 'hursh-agrawal',
      firstName: 'Hursh',
      lastName: 'Agrawal',
      photoUrl: `${TEMP_ASSET_HOST}/hursh.jpg`,
      status: Status.Busy,
      lastFree: {
        start: DateTime.local()
          .minus({ hours: 3, minutes: 8 })
          .minus({ minutes: 30 }),
        end: DateTime.local().minus({ hours: 3, minutes: 8 }),
      },
    },
    {
      id: 'ian-arnold',
      firstName: 'Ian',
      lastName: 'Arnold',
      photoUrl: `${TEMP_ASSET_HOST}/ian.jpg`,
      status: Status.Free,
      lastFree: {
        start: DateTime.local().minus({ hours: 1 }),
        end: DateTime.local().plus({ hours: 1 }),
      },
    },
    {
      id: 'david-felzer',
      firstName: 'David',
      lastName: 'Felzer',
      photoUrl: `${TEMP_ASSET_HOST}/felzer.jpg`,
      status: Status.Busy,
      lastFree: {
        start: DateTime.local()
          .minus({ hours: 12, minutes: 23 })
          .minus({ minutes: 30 }),
        end: DateTime.local().minus({ hours: 12, minutes: 23 }),
      },
    },
    {
      id: 'anna-kobara',
      firstName: 'Anna',
      lastName: 'Kobara',
      photoUrl: `${TEMP_ASSET_HOST}/anna.jpg`,
      status: Status.Busy,
      lastFree: {
        start: DateTime.local()
          .minus({ hours: 54, minutes: 54 })
          .minus({ minutes: 30 }),
        end: DateTime.local().minus({ hours: 54, minutes: 54 }),
      },
    },
    {
      id: 'paulina-kurtz',
      firstName: 'Paulina',
      lastName: 'Kurtz',
      photoUrl: `${TEMP_ASSET_HOST}/paulina.jpg`,
      status: Status.Busy,
      lastFree: {
        start: DateTime.local()
          .minus({ hours: 23, minutes: 9 })
          .minus({ minutes: 30 }),
        end: DateTime.local().minus({ hours: 23, minutes: 9 }),
      },
    },
    {
      id: 'sawyer-huff',
      firstName: 'Sawyer',
      lastName: 'Huff',
      photoUrl: `${TEMP_ASSET_HOST}/sawyer.jpg`,
      status: Status.Busy,
      lastFree: {
        start: DateTime.local()
          .minus({ hours: 22, minutes: 13 })
          .minus({ minutes: 30 }),
        end: DateTime.local().minus({ hours: 22, minutes: 13 }),
      },
    },
  ]
}

export default {
  getSession,
  login,
  logout,
  verifyPhone,
  me,
  feed,
}
