import Bottleneck from 'bottleneck'
import SpotifyWebApi from 'spotify-web-api-node'

const spotify = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
})

export const limiter = new Bottleneck({
  maxConcurrent: 30,
  minTime: 100,
})

export default spotify
