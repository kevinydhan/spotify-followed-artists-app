import type SpotifyWebApi from 'spotify-web-api-node'

import spotify, { limiter } from '../api'

export type GetAllAlbumTracks = (
  ...args: Parameters<SpotifyWebApi['getAlbumTracks']>
) => Promise<SpotifyApi.TrackObjectSimplified[]>

const defaultOptions = {
  limit: 50,
}

const getAllAlbumTracks: GetAllAlbumTracks = async (
  albumId,
  options = defaultOptions
) => {
  const albumTracks: SpotifyApi.TrackObjectSimplified[] = []
  const response = await limiter.schedule(() => {
    return spotify.getAlbumTracks(albumId, options)
  })

  albumTracks.push(...response.body.items)

  if (response.body.next) {
    const responses = await limiter.schedule(() => {
      const { limit, total } = response.body
      const tasks: ReturnType<SpotifyWebApi['getAlbumTracks']>[] = []
      let newTask: ReturnType<SpotifyWebApi['getAlbumTracks']>
      let taskOptions: Parameters<GetAllAlbumTracks>[1]

      for (let offset = limit; offset < total; offset += limit) {
        taskOptions = { ...options, limit, offset }
        newTask = spotify.getAlbumTracks(albumId, taskOptions)
        tasks.push(newTask)
      }

      return Promise.all(tasks)
    })

    responses.forEach((response) => {
      albumTracks.push(...response.body.items)
    })
  }

  return albumTracks
}

export default getAllAlbumTracks
