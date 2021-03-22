import type { IFieldResolver } from 'apollo-server-micro'

import { getAllFollowedArtistsAlbums } from '@/controllers/ServerDataController'
import spotify, { getAllAlbumTracks } from '@/modules/spotify'

type FieldResolver<Arguments = Record<string, never>> = IFieldResolver<
  unknown,
  unknown,
  Arguments
>

const resolveFollowedArtistsAlbumsQuery: FieldResolver = () => {
  return getAllFollowedArtistsAlbums()
}

const resolveAlbumTracksQuery: FieldResolver<{
  albumId: string
}> = (_, { albumId }) => getAllAlbumTracks(albumId)

export default {
  Query: {
    followedArtistsAlbums: resolveFollowedArtistsAlbumsQuery,
    albumTracks: resolveAlbumTracksQuery,
  },
}
