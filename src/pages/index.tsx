import { useQuery } from '@apollo/client'
import type { NextPage } from 'next'
import { useEffect } from 'react'

import { FOLLOWED_ARTISTS_IDS } from '@/graphql/client'
interface IndexPageProps {
  fill?: string
}

const getAlbumsFromFollowedArtists = async () => {
  const followedArtistsRes = await fetch('/api/graphql', {
    method: 'POST',
    body: JSON.stringify({
      query: `
        query {
          followedArtists {
            id
          }
        }
      `,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const followedArtistsBody = await followedArtistsRes.json()
  const followedArtistsIds = followedArtistsBody.data.followedArtists.map(
    (artist) => artist.id
  )

  console.log(followedArtistsIds)
}

const IndexPage: NextPage<IndexPageProps> = () => {
  const { loading, error, data } = useQuery(FOLLOWED_ARTISTS_IDS)
  console.log(data)
  return <div>Index Page</div>
}

export default IndexPage
