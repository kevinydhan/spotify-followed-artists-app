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
   followers: FollowersObject!
   genres: [String!]!
   images: [ImageObject!]!
   popularity: Int!
 }
`

export const Query = `
  type Query {
    followingArtists: [ArtistObjectFull!]!
  }
`

export default `
  ${Query}
  ${ImageObject}
  ${FollowersObject}
  ${ArtistObjectFull}
`
