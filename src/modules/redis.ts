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

const hmsetAsync = promisify(client.hmset)
const hmset: typeof hmsetAsync = hmsetAsync.bind(client)

const setexAsync = promisify(client.setex)
const setex: typeof setexAsync = setexAsync.bind(client)

const quitAsync = promisify(client.quit)
const quit: typeof quitAsync = quitAsync.bind(client)

const flushdbAsync = promisify(client.flushdb)
const flushdb: typeof flushdbAsync = flushdbAsync.bind(client)

const mgetAsync: (keys: string[]) => Promise<string[]> = promisify(client.mget)
const mget: typeof mgetAsync = mgetAsync.bind(client)

const msetAsync: (
  keyValues: (string | number)[]
) => Promise<boolean> = promisify(client.mset)
const mset: typeof msetAsync = mgetAsync.bind(client)

export default {
  get,
  mget,
  set,
  setex,
  mset,
  hmset,
  quit,
  flushdb,
}
