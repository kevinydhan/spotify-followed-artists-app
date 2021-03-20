import SpotifyWebApi from 'spotify-web-api-node'

const spotify = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
})

export const getAllFollowedArtists = async (
  options: Parameters<SpotifyWebApi['getFollowedArtists']>[0] = { limit: 50 }
): Promise<SpotifyApi.ArtistObjectFull[]> => {
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

export default spotify
