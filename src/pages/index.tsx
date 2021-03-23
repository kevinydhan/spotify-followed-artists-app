import type { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/client'

import { AlbumListScreen, SignInScreen } from '@/views'
interface IndexPageProps {
  isLoggedIn: boolean
}

const IndexPage: NextPage<IndexPageProps> = ({ isLoggedIn }) => {
  if (!isLoggedIn) return <SignInScreen />
  return <AlbumListScreen />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  return {
    props: {
      isLoggedIn: !!session,
    },
  }
}

export default IndexPage
