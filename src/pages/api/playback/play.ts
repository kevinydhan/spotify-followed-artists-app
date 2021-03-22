import { getSession } from 'next-auth/client'

import spotify from '@/modules/spotify'

export default async function handler(req, res) {
  const session = await getSession({ req })
  if (!session?.accessToken) res.status(401).send({})

  spotify.setAccessToken(session.accessToken)

  try {
    await spotify.play({ uris: [req.query?.trackUri] })
    return res.status(204).end()
  } catch {
    return res.status(500).send({
      error: {
        status: 500,
      },
    })
  }
}
