import type { FollowedArtistAlbum } from '@/types'

export interface AlbumListProps {
  albums?: FollowedArtistAlbum[]
  openTrackDrawer: (albumId: string) => void
}

export type JoinArtistNames = (
  artists: FollowedArtistAlbum['artists'],
  separator?: string
) => string
