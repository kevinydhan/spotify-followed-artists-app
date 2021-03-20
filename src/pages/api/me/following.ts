import { NextApiHandler } from 'next'
import { getSession } from 'next-auth/client'

import spotify, { getAllFollowedArtists } from '@/modules/spotify'

const handleRequest: NextApiHandler = async (req, res) => {
  const session = await getSession({ req })
  if (!session?.accessToken) return res.status(401).send({})

  spotify.setAccessToken(session.accessToken)
  const followedArtists = await getAllFollowedArtists()
  res.send({ body: followedArtists })
}

export default handleRequest
