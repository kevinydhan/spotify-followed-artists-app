import { getSession } from 'next-auth/client'

import spotify from '@/modules/spotify'

export default async function handler(req, res) {
  const session = await getSession({ req })
  if (!session?.accessToken) return res.status(401).send({})

  const query = req.query?.queue
  if (query.length < 2) {
    return res.status(400).send({
      error: {
        status: 400,
        message: 'Missing track uri',
      },
    })
  }

  spotify.setAccessToken(session.accessToken)

  try {
    await spotify.addToQueue(query[1])
    return res.status(204).end()
  } catch {
    return res.status(500).send({
      error: {
        status: 500,
      },
    })
  }
}
