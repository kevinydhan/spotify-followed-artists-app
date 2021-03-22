import {
  ArtistObjectSimplifiedFields,
  ContextObjectFields,
} from './isolated-fields'

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

export const ArtistObjectSimplified = `
  type ArtistObjectSimplified {
    ${ArtistObjectSimplifiedFields}
  }
`

/**
 * @see {SpotifyApi.ArtistAlbumSimplified}
 */
export const ArtistAlbumSimplified = `
  type ArtistAlbumSimplified {
    ${ContextObjectFields}

    """
    The field is present when getting an artist’s albums.
    Compare to \`album_type\`, this field represents relationship between the
    artist and the album.
    """
    album_group: ArtistAlbumGroup


    """
    The type of the album: one of “album”, “single”, or “compilation”.
    """
    album_type: ArtistAlbumType!


    """
    The artists of the album.
    Each artist object includes a link in href to more detailed information about the artist.
    """
    artists: [ArtistObjectSimplified!]!


    """
    The markets in which the album is available:
    [ISO 3166-1 alpha-2 country codes](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).
    Note that an album is considered available in a market when at least 1 of
    its tracks is available in that market.
    """
    available_markets: [String!]


    """
    The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the album.
    """
    id: String!


    """
    The cover art for the album in various sizes, widest first.
    """
    images: [ImageObject!]!


    """
    The name of the album. In case of an album takedown, the value may be an
    empty string.
    """
    name: String!


    """
    The date the album was first released, for example \`1981\`.
    Depending on the precision, it might be shown as \`1981-12\` or
    \`1981-12-15\`.
    """
    release_date: String!


    """
    The precision of the release date.
    """
    release_date_precision: ReleaseDatePrecision!


    """
    Part of the response when [Track Relinking](https://developer.spotify.com/documentation/general/guides/track-relinking-guide/) is applied, the
    original track is not available in the given market, and Spotify did not
    have any tracks to relink it with. The track response will still contain
    metadata for the original track, and a restrictions object containing the
    reason why the track is not available:
    \`"restrictions" : {"reason" : "market"}\`
    """
    restrictions: RestrictionsObject
  }
`

/**
 * @todo
 * - Add `linked_from` field.
 *
 * @see {SpotifyApi.TrackObjectSimplified}
 */
export const TrackObjectSimplified = `
  type TrackObjectSimplified {
    ${ContextObjectFields}

    artists: [ArtistObjectSimplified!]!
    available_markets: [String!]
    disc_number: Int!
    duration_ms: Int!
    id: ID!
    is_playable: Boolean!
    restrictions: RestrictionsObject
    name: String!
    preview_url: String
    track_number: Int!
  }
`
