/**
 * @see {SpotifyApi.ExternalUrlObject}
 */
export const ExternalUrlObject = `
  type ExternalUrlObject {
    spotify: String!
  }
`

/**
 * @see {SpotifyApi.RestrictionsObject}
 */
export const RestrictionObject = `
  type RestrictionsObject {
    reason: String!
  }
`

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
