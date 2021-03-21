import type { IFieldResolver } from 'apollo-server-micro'

import { getAllFollowedArtistsAlbums } from '@/controllers/ServerDataController'

type FieldResolver<Arguments = Record<string, never>> = IFieldResolver<
  unknown,
  unknown,
  Arguments
>

const resolveFollowedArtistsAlbumsQuery: FieldResolver = () => {
  return getAllFollowedArtistsAlbums()
}

export default {
  Query: {
    followedArtistsAlbums: resolveFollowedArtistsAlbumsQuery,
  },
}
