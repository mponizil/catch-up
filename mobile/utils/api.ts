import qs from 'query-string'
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
    .then((httpResponse) => httpResponse.text())
    .then((text) => {
      try {
        return JSON.parse(text)
      } catch {
        console.warn(`(api) error parsing response as json`)
        return {
          error: {
            code: '500',
            message: 'error parsing response as json',
            data: {
              responseText: text,
            },
          },
        }
      }
    })
  if (!result?.error) {
    console.info(`(api) [${method}] ${endpoint} result`, result)
  }
  return result
}

const getSession = async () => api('/api/auth/session')

const signIn = async (phone: string) => {
  const { csrfToken } = await api('/api/auth/csrf')
  await api('/api/auth/signin/email', {
    method: 'post',
    body: {
      csrfToken,
      email: toE164(phone),
    },
  })
}

const signOut = async () => {
  const { csrfToken } = await api('/api/auth/csrf')
  await api('/api/auth/signout', {
    method: 'post',
    body: {
      csrfToken,
    },
  })
}

const verifyPhone = async ({
  phone,
  token,
}: {
  phone: string
  token: string
}) => {
  const params = {
    email: toE164(phone),
    token,
  }
  const query = qs.stringify(params)
  return api(`/api/auth/callback/email?${query}`, {
    method: 'post',
  })
}

const hello = async () => api('/api/hello')

const me = async () => {
  await sleep(200)
  return {
    id: 'misha-ponizil',
    firstName: 'Misha',
    lastName: 'Ponizil',
    photoUrl:
      'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/s320x320/123768498_278226950232755_2476923715086786316_n.jpg?tp=1&_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_ohc=3UTyey8jUfgAX_xZm_t&edm=ABfd0MgBAAAA&ccb=7-4&oh=bf1a31f84ea882fbb004a3e3d30dae3b&oe=60EE3EA4&_nc_sid=7bff83',
    status: Status.Busy,
  }
}

const feed = async () => {
  await sleep(500)
  return [
    {
      id: 'dan-shipper',
      firstName: 'Dan',
      lastName: 'Shipper',
      photoUrl: 'http://localhost:8080/dan.jpg',
      status: Status.Busy,
      lastSeen: DateTime.local().minus({ hours: 2, minutes: 8 }),
    },
    {
      id: 'hursh-agrawal',
      firstName: 'Hursh',
      lastName: 'Agrawal',
      photoUrl: 'http://localhost:8080/hursh.jpg',
      status: Status.Busy,
      lastSeen: DateTime.local().minus({ hours: 3, minutes: 8 }),
    },
    {
      id: 'ian-arnold',
      firstName: 'Ian',
      lastName: 'Arnold',
      photoUrl: 'http://localhost:8080/ian.jpg',
      status: Status.Free,
      lastSeen: DateTime.local().minus({ hours: 5 }),
    },
    {
      id: 'david-felzer',
      firstName: 'David',
      lastName: 'Felzer',
      photoUrl: 'http://localhost:8080/felzer.jpg',
      status: Status.Busy,
      lastSeen: DateTime.local().minus({ hours: 12, minutes: 23 }),
    },
    {
      id: 'anna-kobara',
      firstName: 'Anna',
      lastName: 'Kobara',
      photoUrl: 'http://localhost:8080/anna.jpg',
      status: Status.Busy,
      lastSeen: DateTime.local().minus({ hours: 54, minutes: 54 }),
    },
    {
      id: 'paulina-kurtz',
      firstName: 'Paulina',
      lastName: 'Kurtz',
      photoUrl: 'http://localhost:8080/paulina.jpg',
      status: Status.Busy,
      lastSeen: DateTime.local().minus({ hours: 23, minutes: 9 }),
    },
    {
      id: 'sawyer-huff',
      firstName: 'Sawyer',
      lastName: 'Huff',
      photoUrl: 'http://localhost:8080/sawyer.jpg',
      status: Status.Busy,
      lastSeen: DateTime.local().minus({ hours: 22, minutes: 13 }),
    },
  ]
}

export default {
  getSession,
  signIn,
  signOut,
  verifyPhone,
  hello,
  me,
  feed,
}
