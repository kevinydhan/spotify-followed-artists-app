import { getAllArtistAlbums, getAllFollowedArtists } from '@/modules/spotify'

class ServerDataController {
  getAllFollowedArtistsIds = async () => {
    const followedArtists = await getAllFollowedArtists()
    return followedArtists.map((artist) => artist.id)
  }

  getAllArtistsAlbumsIds = async (artistIds: string[]) => {
    const tasks = artistIds
      .slice(0, 5)
      .map((artistId) => getAllArtistAlbums(artistId))
    const responses = await Promise.all(tasks)
    return responses.flat()
  }

  getAllFollowedArtistsAlbums = async () => {
    const { getAllFollowedArtistsIds, getAllArtistsAlbumsIds } = this
    const artistIds = await getAllFollowedArtistsIds()
    return getAllArtistsAlbumsIds(artistIds)
  }
}

const controller = new ServerDataController()

export const getAllFollowedArtistsAlbums =
  controller.getAllFollowedArtistsAlbums

export default controller
