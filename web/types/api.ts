import { NextApiRequest, NextApiResponse } from 'next'
import { User as PrismaUser } from '@prisma/client'

declare global {
  namespace Express {
    interface User extends PrismaUser {}
  }
}

export type ApiRequest = NextApiRequest &
  Express.Request & {
    session?: any
  }

export type ApiResponse = NextApiResponse
