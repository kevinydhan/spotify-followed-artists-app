import * as commonTypes from './common'
import * as complex from './complex'
import * as enums from './enums'

export default `
  type Query {
    followingArtists: [ArtistObjectFull!]!
    artistAlbums(artistId: String!): [ArtistAlbumSimplified!]!
  }

  ${Object.values(commonTypes)}
  ${Object.values(complex)}
  ${Object.values(enums)}
`
