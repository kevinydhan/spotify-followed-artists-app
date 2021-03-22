import { getSession } from 'next-auth/client'

import spotify, { getAllArtistAlbums } from '@/modules/spotify'

export default async function handler(req, res) {
  const session = await getSession({ req })
  if (!session?.accessToken) return res.status(401).send({})
  spotify.setAccessToken(session.accessToken)

  const response = await getAllArtistAlbums('0XATRDCYuuGhk0oE7C0o5G', {
    limit: 50,
    include_groups: 'album,single',
  })
  const ids = response.map((item) => item.id)
  const unique = new Set(ids)
  const hashMap = new Map<string, SpotifyApi.AlbumObjectSimplified[]>()
  response.forEach((record) => {
    const arr = hashMap.get(record.id)
    if (!arr) hashMap.set(record.id, [record])
    else arr.push(record)
  })

  const obj = {}
  hashMap.forEach(
    (value, key) =>
      (obj[key] = value.map((item) => ({
        id: item.id,
        date: item.release_date,
        name: item.name,
      })))
  )

  res.send({
    ids: ids.length,
    unique: unique.size,
    hash: obj,
    // response: response.map((record) => {
    //   return {
    //     id: record.id,
    //     type: record.album_type,
    //     name: record.name,
    //     releaseDate: record.release_date,
    //     artists: record.artists,
    //   }
    // }),
  })
}
