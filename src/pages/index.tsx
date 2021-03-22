import { useQuery } from '@apollo/client'
import { AlbumTrackTable } from 'components'
import type { NextPage } from 'next'
import { useState } from 'react'

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
      style={{
        display: 'flex',
      }}
    >
      <div>
        <h1>New Releases</h1>
        <ul>
          {data.followedArtistsAlbums.map((album) => {
            return (
              <li key={album.id}>
                <button onClick={handleButtonClick(album.id)}>
                  {album.name}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
      <div>
        <h2>Album Tracks</h2>
        {displayedAlbumId && <AlbumTrackTable albumId={displayedAlbumId} />}
      </div>
    </div>
  )
}

export default IndexPage
