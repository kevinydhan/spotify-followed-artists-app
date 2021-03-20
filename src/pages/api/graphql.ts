import { ApolloServer, AuthenticationError } from 'apollo-server-micro'
import { getSession } from 'next-auth/client'

import resolvers from '@/graphql/resolvers'
import typeDefs from '@/graphql/types'
import spotify from '@/modules/spotify'

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

const apolloServer = new ApolloServer({
  resolvers,
  typeDefs,
  context: async ({ req }) => {
    const session = await getSession({ req })
    if (!session?.accessToken) {
      throw new AuthenticationError('You must be signed in')
    }
    return spotify.setAccessToken(session.accessToken)
  },
  playground: {
    settings: {
      'request.credentials': 'include',
    },
  },
})

export default apolloServer.createHandler({ path: '/api/graphql' })
