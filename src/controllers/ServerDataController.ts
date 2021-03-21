import { getAllArtistAlbums, getAllFollowedArtists } from '@/modules/spotify'

class ServerDataController {
  getAllFollowedArtistsIds = async () => {
    const followedArtists = await getAllFollowedArtists()
    return followedArtists.map((artist) => artist.id)
  }

  getAllArtistsAlbumsIds = async (artistIds: string[]) => {
    const tasks = artistIds
      .slice(0, 10)
      .map((artistId) => getAllArtistAlbums(artistId))
    const responses = await Promise.all(tasks)
    console.log(responses)
  }

  getAllFollowedArtistsAlbums = async () => {
    const { getAllFollowedArtistsIds, getAllArtistsAlbumsIds } = this
    const artistIds = await getAllFollowedArtistsIds()
    const artistsAlbumsIds = await getAllArtistsAlbumsIds(artistIds)
  }
}

const controller = new ServerDataController()

export const getAllFollowedArtistsAlbums =
  controller.getAllFollowedArtistsAlbums

export default controller
