import { useQuery } from '@apollo/client'
import type { NextPage } from 'next'
import React, { useState } from 'react'

import { AlbumList, AlbumTrackTable } from '@/components'
import {
  FOLLOWED_ARTISTS_ALBUMS as query,
  GetFollowedArtistsAlbumsQueryData as QueryData,
} from '@/graphql/client'

interface IndexPageProps {
  fill?: string
}

const IndexPage: NextPage<IndexPageProps> = () => {
  const { loading, data } = useQuery<QueryData>(query)
  const [displayedAlbumId, setDisplayedAlbumId] = useState('')

  const handleButtonClick = (albumId: string) => () => {
    if (displayedAlbumId !== albumId) setDisplayedAlbumId(albumId)
  }

  if (loading) return <div>Loading...</div>

  return (
    <div
      style={
        {
          // display: 'grid',
          // gridTemplateColumns: 'repeat(2, 1fr)',
          // width: '100%',
        }
      }
    >
      <div>
        <h1>New Releases</h1>
        <AlbumList albums={data.followedArtistsAlbums} />
      </div>
      <div>
        <h2>Album Tracks</h2>
        {displayedAlbumId && <AlbumTrackTable albumId={displayedAlbumId} />}
      </div>
    </div>
  )
}

export default IndexPage
