import { useQuery } from '@apollo/client'
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  useDisclosure,
} from '@chakra-ui/react'
import { FunctionComponent, useState } from 'react'

import { AlbumList, TrackList } from '@/components'
import {
  FOLLOWED_ARTISTS_ALBUMS as query,
  GetFollowedArtistsAlbumsQueryData as QueryData,
} from '@/graphql/client'
import { LoadingScreen } from '@/views'

const AlbumListScreen: FunctionComponent = () => {
  const { loading, data } = useQuery<QueryData>(query)
  const [clickedAlbumId, setClickedAlbumId] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()

  const openTrackDrawer = (albumId: string) => () => {
    setClickedAlbumId(albumId)
    onOpen()
  }

  const closeTrackDrawer = () => {
    setClickedAlbumId('')
    onClose()
  }

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
      <AlbumList
        albums={data.followedArtistsAlbums}
        openTrackDrawer={openTrackDrawer}
      />
      <Drawer placement="bottom" isOpen={isOpen} onClose={closeTrackDrawer}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Tracks</DrawerHeader>
            <DrawerBody>
              <TrackList albumId={clickedAlbumId} />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  )
}

export default AlbumListScreen
