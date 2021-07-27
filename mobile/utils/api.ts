import qs from 'query-string'
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
  await api(`/api/auth/callback/email?${query}`, {
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
      photoUrl:
        'https://pbs.twimg.com/profile_images/950485033910964224/rW6Pna6R_400x400.jpg',
      status: Status.Busy,
    },
    {
      id: 'hursh-agrawal',
      firstName: 'Hursh',
      lastName: 'Agrawal',
      photoUrl:
        'https://pbs.twimg.com/profile_images/1417270215/hursh_1307461900_34_small_400x400.jpg',
      status: Status.Busy,
    },
    {
      id: 'ian-arnold',
      firstName: 'Ian',
      lastName: 'Arnold',
      photoUrl:
        'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/s320x320/81428850_2512845308995846_5382404795749367808_n.jpg?tp=1&_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_ohc=KYGxh7ht-CgAX-ClIc1&edm=ABfd0MgBAAAA&ccb=7-4&oh=44d8301697950713483a69ca8b128c14&oe=60ED2DB0&_nc_sid=7bff83',
      status: Status.Free,
    },
    {
      id: 'david-felzer',
      firstName: 'David',
      lastName: 'Felzer',
      photoUrl:
        'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/76960942_2858385047545504_2370869350772087577_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=IE70iXEM6mkAX9gnqrv&edm=AP_V10EBAAAA&ccb=7-4&oh=136f4cff29a624e0c57b620bed8012ab&oe=60ECE8EE&_nc_sid=4f375e',
      status: Status.Busy,
    },
    {
      id: 'anna-kobara',
      firstName: 'Anna',
      lastName: 'Kobara',
      photoUrl:
        'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/s320x320/11374305_1658598561047862_890771928_a.jpg?tp=1&_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_ohc=6eHFyoYTi4UAX_hk1jf&tn=yrMzdxpK2u5iVXwv&edm=ABfd0MgBAAAA&ccb=7-4&oh=10315c482655699173026744e91dc684&oe=60ED2324&_nc_sid=7bff83',
      status: Status.Busy,
    },
    {
      id: 'paulina-kurtz',
      firstName: 'Paulina',
      lastName: 'Kurtz',
      photoUrl:
        'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/s320x320/195359422_485225232688340_8096613028852566863_n.jpg?tp=1&_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_ohc=WeLr2peeWuEAX9Ovamx&edm=ABfd0MgBAAAA&ccb=7-4&oh=419d4cdfda36d4be65b4370053bc2d39&oe=60ECAE98&_nc_sid=7bff83',
      status: Status.Busy,
    },
    {
      id: 'sawyer-huff',
      firstName: 'Sawyer',
      lastName: 'Huff',
      photoUrl:
        'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/s320x320/178508732_157672949614463_6789226718685248840_n.jpg?tp=1&_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_ohc=_GoANp3_Q0UAX_b-JMO&edm=ABfd0MgBAAAA&ccb=7-4&oh=4ed999e5e3f9d1c2c20d36ba51d8eb85&oe=60EE3930&_nc_sid=7bff83',
      status: Status.Busy,
    },
  ]
}

export default {
  signIn,
  signOut,
  verifyPhone,
  hello,
  me,
  feed,
}
