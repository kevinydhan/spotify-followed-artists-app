import { ApolloServer } from 'apollo-server-micro'

import resolvers from '@/graphql/resolvers'
import typeDefs from '@/graphql/types'

/**
 * This NextJS configuration is required for `ApolloServer` to work correctly.
 *
 * @see https://github.com/vercel/next.js/blob/canary/examples/api-routes-graphql/pages/api/graphql.js
 * @see https://nextjs.org/docs/api-routes/api-middlewares#custom-config
 */
export const config = {
  api: {
    bodyParser: false,
  },
}

const apolloServer = new ApolloServer({ typeDefs, resolvers })

export default apolloServer.createHandler({ path: '/api/graphql' })
