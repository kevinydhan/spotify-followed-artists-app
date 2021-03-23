import type { FollowedArtistAlbum } from '@/types'

export interface AlbumListProps {
  albums: FollowedArtistAlbum[]
}

export type JoinArtistNames = (
  artists: FollowedArtistAlbum['artists'],
  separator?: string
) => string
