import redis from '@/modules/redis'
import { getAllArtistAlbums, getAllFollowedArtists } from '@/modules/spotify'

class CacheController {
  // 6 hours converted to seconds
  static EX_TTL = 6 * 60 * 60

  static getRecords = async (keys: string[]) => {
    const cache = await redis.mget(keys)
    const promises = []

    for (let i = 0; i < keys.length; i++) {
      if (cache[i]) promises.push(Promise.resolve(cache[i]))
      else promises.push(Promise.reject(keys[i]))
    }

    return Promise.allSettled<string>(promises)
  }

  static writeRecords = async (keyValues: [string, string][]) => {
    const { EX_TTL } = CacheController
    const tasks = keyValues.map(([key, value]) => {
      return redis.setex(key, EX_TTL, value)
    })
    await Promise.all(tasks)
    return true
  }
}

class ServerDataController {
  static getAllFollowedArtistsIds = async (): Promise<
    SpotifyApi.ArtistObjectFull['id'][]
  > => {
    const followedArtists = await getAllFollowedArtists()
    return followedArtists.map((artist) => artist.id)
  }

  static getAllArtistsAlbumsIds = async (artistIds: string[]) => {
    const cache = await CacheController.getRecords(artistIds)
    const cacheHits = cache.filter(({ status }) => status === 'fulfilled')
    const cacheMisses = cache.filter(({ status }) => status === 'rejected')
    console.log(cacheHits)

    if (!cacheMisses.length) return cacheHits.map(({ value }) => value)
    const tasks = cacheMisses
      .slice(0, 2)
      .map((result) => getAllArtistAlbums(result?.reason))

    console.time('getAllArtistsAlbums')
    const responses = await Promise.all(tasks)
    console.timeEnd('getAllArtistsAlbums')

    const newRecords = responses.map((response, i) => {
      const albumIds = response.map((album) => album.id)
      return [artistIds[i], albumIds.join(',')] as [string, string]
    })
    await CacheController.writeRecords(newRecords)
  }

  static getAllFollowedArtistsAlbums = async () => {
    const {
      getAllFollowedArtistsIds,
      getAllArtistsAlbumsIds,
    } = ServerDataController
    const artistIds = await getAllFollowedArtistsIds()
    const artistsAlbumsIds = await getAllArtistsAlbumsIds(artistIds)
  }
}

export default ServerDataController
