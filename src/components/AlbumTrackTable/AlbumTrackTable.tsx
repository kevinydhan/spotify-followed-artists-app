import { useQuery } from '@apollo/client'
import { FunctionComponent } from 'react'

import {
  ALBUM_TRACKS,
  GetAlbumTracksQueryData as Data,
  GetAlbumTracksQueryVariables as Vars,
} from '@/graphql/client'

interface Props {
  albumId: string
}

const AlbumTrackTable: FunctionComponent<Props> = ({ albumId }) => {
  const { data } = useQuery<Data, Vars>(ALBUM_TRACKS, {
    variables: { albumId },
  })

  if (data) {
    return (
      <ul>
        {data.albumTracks.map((track) => {
          return <li key={track.id}>{track.name}</li>
        })}
      </ul>
    )
  }
  return null
}

export default AlbumTrackTable
