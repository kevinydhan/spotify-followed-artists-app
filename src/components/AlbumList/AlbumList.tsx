import { Box, Flex, Image, Spacer, Text, VStack } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'

import type { AlbumListProps, JoinArtistNames } from './AlbumList.d'

const AlbumList: FunctionComponent<AlbumListProps> = ({ albums }) => (
  <VStack as="ul" listStyleType="none" align="left">
    {albums.map((album) => (
      <Flex as="li" key={album.id} align="center">
        <Image
          {...album.images[0]}
          boxSize="64px"
          fallbackSrc="https://via.placeholder.com/64"
        />
        <Box>
          <Text>{album.name}</Text>
          <Text>by {joinArtistNames(album.artists)}</Text>
          <Text>
            {album.totalTracks} {album.totalTracks > 1 ? 'tracks' : 'track'}
          </Text>
          <Text>{album.releaseDate}</Text>
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
