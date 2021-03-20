import { ArtistObjectSimplifiedFields } from './isolated-fields'

/**
 * @see {SpotifyApi.ArtistObjectFull}
 */
export const ArtistObjectFull = `
  type ArtistObjectFull {
    ${ArtistObjectSimplifiedFields}

    """
    Information about the followers of the artist.
    """
    followers: FollowersObject!

    """
    A list of the genres the artist is associated with.
    For example: "Prog Rock" , "Post-Grunge".
    (If not yet classified, the array is empty.)
    """
    genres: [String!]!

    """
    Images of the artist in various sizes, widest first.
    """
    images: [ImageObject!]!

    """
    The popularity of the artist. The value will be between \`0\` and \`100\`, with \`100\` being the most popular.
    The artist’s popularity is calculated from the popularity of all the artist’s tracks.
    """
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
