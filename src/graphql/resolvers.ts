import { getAllFollowedArtists } from '@/modules/spotify'

export default {
  Query: {
    followingArtists: getAllFollowedArtists,
  },
}
