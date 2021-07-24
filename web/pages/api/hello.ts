import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (session) {
    res.json(session)
  } else {
    res.status(403).json({
      error: {
        code: '403_001',
        message: 'no active session',
      },
    })
  }
}
