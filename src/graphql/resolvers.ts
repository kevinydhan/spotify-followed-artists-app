import type { IFieldResolver } from 'apollo-server-micro'

import {
  GetAllArtistAlbums,
  getAllArtistAlbums,
  getAllFollowedArtists,
} from '@/modules/spotify'

type FieldResolver<Arguments = Record<string, never>> = IFieldResolver<
  unknown,
  unknown,
  Arguments
>

const resolveFollowedArtistsQuery: FieldResolver = () => {
  return getAllFollowedArtists()
}

const resolveArtistAlbumsQuery: FieldResolver<{
  artistId: Parameters<GetAllArtistAlbums>[0]
}> = (parent, { artistId }) => {
  return getAllArtistAlbums(artistId)
}

const query = (query: TemplateStringsArray | string) => {
  return fetch(process.env.NEXTAUTH_URL + '/api/graphql', {
    method: 'POST',
    body: JSON.stringify({ query }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

const followedArtistsAlbums = () => {
  return []
  // query(`
  //   query GetArtistAlbums {
  //     artistAlbums(artistId: "02VHimy9SANlUc6t4G4dWN") {
  //       id
  //     }
  //   }
  // `)
  //   .then((res) => console.log('response', res))
  //   .catch((err) => console.log('error', err))
}

export default {
  Query: {
    followedArtists: resolveFollowedArtistsQuery,
    artistAlbums: resolveArtistAlbumsQuery,
    followedArtistsAlbums,
  },
}
