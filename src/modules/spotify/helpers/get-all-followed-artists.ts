import type SpotifyWebApi from 'spotify-web-api-node'

import spotify from '../api'

export type GetAllFollowedArtists = (
  ...args: Parameters<SpotifyWebApi['getFollowedArtists']>
) => Promise<SpotifyApi.ArtistObjectFull[]>

const defaultOptions = {
  limit: 50,
}

const getAllFollowedArtists: GetAllFollowedArtists = async (
  options = defaultOptions
) => {
  const followedArtists: SpotifyApi.ArtistObjectFull[] = []
  let response = await spotify.getFollowedArtists(options)

  while (response.body.artists.next) {
    followedArtists.push(...response.body.artists.items)
    response = await spotify.getFollowedArtists({
      /**
       * Linting for the `after` property was disabled because it was typed as
       * a `number` instead of a `string`.
       */
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      after: response.body.artists.cursors.after,
      limit: response.body.artists.limit,
    })
  }

  followedArtists.push(...response.body.artists.items)
  return followedArtists
}

export default getAllFollowedArtists
