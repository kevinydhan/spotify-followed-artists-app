import { useQuery } from '@apollo/client'
import { Box, Heading } from '@chakra-ui/react'
import type { FunctionComponent } from 'react'

import { AlbumList } from '@/components'
import {
  FOLLOWED_ARTISTS_ALBUMS as query,
  GetFollowedArtistsAlbumsQueryData as QueryData,
} from '@/graphql/client'
import { LoadingScreen } from '@/views'

const AlbumListScreen: FunctionComponent = () => {
  const { loading, data } = useQuery<QueryData>(query)

  if (loading) return <LoadingScreen />
  return (
    <Box marginBottom="4">
      <Heading
        as="h1"
        lineHeight="1"
        paddingX="2"
        marginTop="4"
        marginBottom="8"
      >
        New releases from your followed artists
      </Heading>
      <AlbumList albums={data.followedArtistsAlbums} />
    </Box>
  )
}

export default AlbumListScreen
