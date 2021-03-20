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
   album_group: ArtistAlbumGroup
 }
`
