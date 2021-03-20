import type SpotifyWebApi from 'spotify-web-api-node'

import spotify from '../api'

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
  console.log(artistId)
  const followedArtists: SpotifyApi.AlbumObjectSimplified[] = []
  const response = await spotify.getArtistAlbums(artistId, options)

  // while (response.body.next) {
  //   followedArtists.push(...response.body.items)
  //   response = await spotify.getArtistAlbums({
  //     /**
  //      * Linting for the `after` property was disabled because it was typed as
  //      * a `number` instead of a `string`.
  //      */
  //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //     // @ts-ignore
  //     after: response.body.artists.cursors.after,
  //     limit: response.body.artists.limit,
  //   })
  // }

  followedArtists.push(...response.body.items)
  return followedArtists
}

export default getAllArtistAlbums
