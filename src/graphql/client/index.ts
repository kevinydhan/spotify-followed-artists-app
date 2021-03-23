import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
})

export * from './queries'

export default client
