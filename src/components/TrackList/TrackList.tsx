import { useQuery } from '@apollo/client'
import {
  Box,
  DrawerBody,
  Flex,
  Heading,
  Image,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react'
import { FunctionComponent, useEffect } from 'react'

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
        <li key={track.id}>{track.name}</li>
      ))}
    </VStack>
  )
}

TrackList.defaultProps = {
  albumId: '',
}

export default TrackList
