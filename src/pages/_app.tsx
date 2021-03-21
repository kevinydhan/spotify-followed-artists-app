import { ApolloProvider } from '@apollo/client'
import type { NextComponentType, NextPage, NextPageContext } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'

interface ModifiedAppProps<CommonPageProps = Record<string, never>>
  extends Omit<AppProps, 'Component' | 'pageProps'> {
  pageProps: CommonPageProps
  Component: NextComponentType<
    NextPageContext,
    CommonPageProps & Record<string, unknown>,
    Record<string, unknown>
  >
}

const App: NextPage<ModifiedAppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Spotify Followed Artists App</title>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <main>
      <Component {...pageProps} />
    </main>
  </>
)

export default App
