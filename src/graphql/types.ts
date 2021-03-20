/**
 * @see {SpotifyApi.ImageObject}
 */
export const ImageObject = `
  type ImageObject {
    url: String!
    width: Int
    height: Int
  }
`

/**
 * @see {SpotifyApi.FollowersObject}
 */
export const FollowersObject = `
  type FollowersObject {
    href: String
    total: Int!
  }
`

/**
 * @see {SpotifyApi.ArtistObjectFull}
 */
export const ArtistObjectFull = `
 type ArtistObjectFull {
    type: String!
    id: String!
    name: String!
    followers: FollowersObject!
    genres: [String!]!
    images: [ImageObject!]!
    popularity: Int!
 }
`

/**
 * @see {SpotifyApi.ArtistAlbumSimplified}
 */
export const ArtistAlbumSimplified = `
  type ArtistAlbumSimplified {
    test: String
  }
`

export const Query = `
  type Query {
    followingArtists: [ArtistObjectFull!]!
    artistAlbums(artistId: String!): [ArtistAlbumSimplified!]!
  }
`
