import { getSession } from 'next-auth/client'

import spotify, { getAllAlbumTracks } from '@/modules/spotify'

export default async function handler(req, res) {
  const session = await getSession({ req })
  spotify.setAccessToken(session?.accessToken)
  const albumTracks = await getAllAlbumTracks('3xTUvCOo5DHNoXuCXYIp8l')
  res.send({ albumTracks })
}
