import { useQuery } from '@apollo/client'
import { Box, StackDivider, Text, VStack } from '@chakra-ui/react'
import type { FunctionComponent } from 'react'

import {
  ALBUM_TRACKS,
  GetAlbumTracksQueryData as Data,
  GetAlbumTracksQueryVariables as Vars,
} from '@/graphql/client'

interface TrackListProps {
  albumId: string
}

const TrackList: FunctionComponent<TrackListProps> = ({ albumId }) => {
  const { loading, data } = useQuery<Data, Vars>(ALBUM_TRACKS, {
    variables: { albumId },
  })

  if (loading) return <p>Loading</p>

  const playSong = (trackUri: string) => async () => {
    try {
      await fetch(`/api/playback/queue/${trackUri}`)
      await fetch('/api/playback/skip')
    } catch {}
  }

  return (
    <VStack
      as="ol"
      listStyleType="none"
      align="left"
      spacing="4"
      marginBottom="4"
      divider={<StackDivider />}
    >
      {data.albumTracks.map((track) => (
        <Box as="li" key={track.id} onClick={playSong(track.uri)}>
          <Text noOfLines={[1]}>{track.name}</Text>
        </Box>
      ))}
    </VStack>
  )
}

TrackList.defaultProps = {
  albumId: '',
}

export default TrackList
