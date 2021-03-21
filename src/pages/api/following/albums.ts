import 'isomorphic-fetch'

import { NextApiHandler } from 'next'
import { getSession } from 'next-auth/client'

import ServerDataController from '@/controllers/ServerDataController'
import spotify from '@/modules/spotify'

const handleRequest: NextApiHandler = async (req, res) => {
  const session = await getSession({ req })
  if (!session?.accessToken) res.status(401).send({})
  spotify.setAccessToken(session.accessToken)

  await ServerDataController.getAllFollowedArtistsAlbums()

  res.send({ hi: session })
}

export default handleRequest
