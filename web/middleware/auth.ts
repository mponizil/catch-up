import nc from 'next-connect'
import { ApiRequest, ApiResponse } from '../types/api'
import base from './base'

const auth = nc()
  .use(base)
  .use((req: ApiRequest, res: ApiResponse, next) => {
    console.log(req.user, req.session)
    if (!req.user) {
      return res.status(401).json({
        message: 'unauthenticated',
      })
    }
    next()
  })

export default auth
