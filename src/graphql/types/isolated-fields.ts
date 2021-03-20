export const ContextObjectFields = `
  """
  The object type.
  """
  type: ContextObjectType!

  """
  A link to the Web API endpoint providing full details.
  """
  href: String!

  """
  The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids).
  """
  uri: String!
`

export const ArtistObjectSimplifiedFields = `
  ${ContextObjectFields}

  """
  The Spotify ID for the artist.
  """
  id: String!

  """
  The name of the artist.
  """
  name: String!
`
