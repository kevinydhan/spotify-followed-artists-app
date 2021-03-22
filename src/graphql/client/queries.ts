import { gql } from '@apollo/client'

export interface FollowedArtistAlbum
  extends Pick<SpotifyApi.AlbumObjectSimplified, 'id' | 'name'> {
  images: Omit<SpotifyApi.ImageObject, 'url'> & {
    src: SpotifyApi.ImageObject['url']
  }
}

export interface GetFollowedArtistsAlbumsQueryData {
  followedArtistsAlbums: FollowedArtistAlbum[]
}

export const FOLLOWED_ARTISTS_ALBUMS = gql`
  query GetFollowedArtistsAlbums {
    followedArtistsAlbums {
      id
      name
      images {
        src: url
        width
        height
      }
    }
  }
`

export interface GetAlbumTracksQueryData {
  albumTracks: Pick<SpotifyApi.AlbumObjectSimplified, 'id' | 'name'>[]
}

export interface GetAlbumTracksQueryVariables {
  albumId: string
}

export const ALBUM_TRACKS = gql`
  query GetAlbumTracks($albumId: String!) {
    albumTracks(albumId: $albumId) {
      id
      name
    }
  }
`
