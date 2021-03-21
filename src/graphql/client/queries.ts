import { gql } from '@apollo/client'

export const FOLLOWED_ARTISTS_IDS = gql`
  query GetFollowedArtistsIds {
    followedArtists {
      id
    }
  }
`
