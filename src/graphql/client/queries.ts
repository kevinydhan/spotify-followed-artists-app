import { gql } from '@apollo/client'

export interface FollowedArtistAlbum
  extends Pick<SpotifyApi.AlbumObjectSimplified, 'id' | 'name'> {
  releaseDate: SpotifyApi.AlbumObjectSimplified['release_date']
  totalTracks: SpotifyApi.AlbumObjectSimplified['total_tracks']
  artists: Pick<SpotifyApi.ArtistObjectSimplified, 'name'>[]
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
      releaseDate: release_date
      totalTracks: total_tracks
      artists {
        name
      }
      images {
        src: url
        width
        height
      }
    }
  }
`

export interface GetAlbumTracksQueryData {
  albumTracks: Pick<SpotifyApi.AlbumObjectSimplified, 'id' | 'name' | 'uri'>[]
}

export interface GetAlbumTracksQueryVariables {
  albumId: string
}

export const ALBUM_TRACKS = gql`
  query GetAlbumTracks($albumId: String!) {
    albumTracks(albumId: $albumId) {
      id
      name
      uri
    }
  }
`
