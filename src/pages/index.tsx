import { useQuery } from '@apollo/client'
import type { NextPage } from 'next'

import {
  FOLLOWED_ARTISTS_ALBUMS as query,
  GetFollowedArtistsAlbumsQueryData as QueryData,
} from '@/graphql/client'

interface IndexPageProps {
  fill?: string
}

const IndexPage: NextPage<IndexPageProps> = () => {
  const { loading, data } = useQuery<QueryData>(query)

  if (loading) return <div>Loading...</div>

  return (
    <ul>
      {data.followedArtistsAlbums.map((album) => {
        return (
          <li key={album.id}>
            <button>{album.name}</button>
          </li>
        )
      })}
    </ul>
  )
}

export default IndexPage
