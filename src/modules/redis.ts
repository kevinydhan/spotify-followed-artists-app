import redis from 'redis'
import { promisify } from 'util'

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
})

const getAsync = promisify(client.get)
const get: typeof getAsync = getAsync.bind(client)

const setAsync = promisify(client.set)
const set: typeof setAsync = setAsync.bind(client)

const quitAsync = promisify(client.quit)
const quit: typeof quitAsync = quitAsync.bind(client)

const flushdbAsync = promisify(client.flushdb)
const flushdb: typeof flushdbAsync = flushdbAsync.bind(client)

export default {
  get,
  set,
  quit,
  flushdb,
}
