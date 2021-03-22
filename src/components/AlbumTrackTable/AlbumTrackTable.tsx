import { useQuery } from '@apollo/client'
import { FunctionComponent, useState } from 'react'

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
  const [errorMessage, setErrorMessage] = useState('')

  const handleButtonClick = (trackUri: string) => async () => {
    try {
      await fetch(`api/playback/play?trackUri=${trackUri}`)
    } catch {
      setErrorMessage('Unable to play track')
    }
  }

  if (data) {
    return (
      <div>
        {errorMessage && <p style={{ background: 'red' }}>{errorMessage}</p>}
        <ul>
          {data.albumTracks.map((track) => {
            return (
              <li key={track.id}>
                {track.name}
                <button onClick={handleButtonClick(track.uri)}>
                  Play on current device
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
  return null
}

export default AlbumTrackTable
