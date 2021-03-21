import type SpotifyWebApi from 'spotify-web-api-node'

import spotify, { limiter } from '../api'

export type GetAllArtistAlbums = (
  ...args: Parameters<SpotifyWebApi['getArtistAlbums']>
) => Promise<SpotifyApi.AlbumObjectSimplified[]>

const defaultOptions = {
  limit: 50,
  include_groups: 'album,single',
}

const getAllArtistAlbums: GetAllArtistAlbums = async (
  artistId,
  options = defaultOptions
) => {
  const artistAlbums: SpotifyApi.AlbumObjectSimplified[] = []
  const response = await limiter.schedule(() => {
    return spotify.getArtistAlbums(artistId, options)
  })
  artistAlbums.push(...response.body.items)

  if (response.body.next) {
    const responses = await limiter.schedule(() => {
      const { offset, limit, total } = response.body
      const tasks: ReturnType<SpotifyWebApi['getArtistAlbums']>[] = []
      let newTask: ReturnType<SpotifyWebApi['getArtistAlbums']>
      let taskOptions: Parameters<GetAllArtistAlbums>[1]

      for (let next = offset; next < total; next += limit) {
        taskOptions = { ...options, limit, offset: next }
        newTask = spotify.getArtistAlbums(artistId, taskOptions)
        tasks.push(newTask)
      }

      return Promise.all(tasks)
    })

    responses.forEach((response) => {
      artistAlbums.push(...response.body.items)
    })
  }

  return artistAlbums
}

export default getAllArtistAlbums
