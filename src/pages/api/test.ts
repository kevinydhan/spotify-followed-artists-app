import { getSession } from 'next-auth/client'

import spotify, { getAllArtistAlbums } from '@/modules/spotify'

export default async function handler(req, res) {
  const session = await getSession({ req })
  if (!session?.accessToken) return res.status(401).send({})
  spotify.setAccessToken(session.accessToken)

  const response = await getAllArtistAlbums('0XATRDCYuuGhk0oE7C0o5G')

  const map = new Map<string, SpotifyApi.AlbumObjectSimplified[]>()
  response.forEach((record) => {
    const arr = map.get(record.name)
    if (arr) arr.push(record)
    else map.set(record.name, [record])
  })
  const hash = {}
  map.forEach((value, key) => (hash[key] = value.length))

  res.send({
    hash: hash,
    response: response.map((record) => {
      return {
        id: record.id,
        type: record.album_type,
        name: record.name,
        releaseDate: record.release_date,
        artists: record.artists,
      }
    }),
  })
}
