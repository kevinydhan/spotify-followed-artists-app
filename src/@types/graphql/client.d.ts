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

export interface GetAlbumTracksQueryData {
  albumTracks: Pick<SpotifyApi.AlbumObjectSimplified, 'id' | 'name' | 'uri'>[]
}

export interface GetAlbumTracksQueryVariables {
  albumId: string
}
