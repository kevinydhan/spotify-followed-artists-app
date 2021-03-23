import {
  Box,
  Flex,
  Heading,
  Image,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react'
import type { FunctionComponent } from 'react'

import type { AlbumListProps, JoinArtistNames } from './AlbumList.d'

const AlbumList: FunctionComponent<AlbumListProps> = ({
  albums,
  openTrackDrawer,
}) => (
  <VStack
    as="ul"
    listStyleType="none"
    align="left"
    spacing="4"
    divider={<StackDivider />}
  >
    {albums.map((album) => (
      <Flex
        as="li"
        key={album.id}
        align="center"
        paddingX="2"
        onClick={openTrackDrawer(album.id)}
      >
        <Image
          {...album.images[0]}
          boxSize="80px"
          fallbackSrc="https://via.placeholder.com/80"
          marginRight="4"
        />
        <Box>
          <Heading as="h2" size="sm" noOfLines={[1]}>
            {album.name}
          </Heading>
          <Text size="sm" marginBottom="1">
            by {joinArtistNames(album.artists)}
          </Text>
          <Text fontSize="14px" color="gray.500">
            {album.totalTracks} {album.totalTracks > 1 ? 'tracks' : 'track'}
          </Text>
        </Box>
      </Flex>
    ))}
  </VStack>
)

const joinArtistNames: JoinArtistNames = (artists, separator = ', ') => {
  return artists.map((artist) => artist.name).join(separator)
}

AlbumList.defaultProps = {
  albums: [],
}

export default AlbumList
