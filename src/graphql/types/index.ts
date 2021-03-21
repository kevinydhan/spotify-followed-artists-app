import * as commonTypes from './common'
import * as complex from './complex'
import * as enums from './enums'

export default `
  type Query {
    followedArtistsAlbums: [ArtistAlbumSimplified!]!
  }

  ${Object.values(commonTypes)}
  ${Object.values(complex)}
  ${Object.values(enums)}
`
