import { Button, Center } from '@chakra-ui/react'
import { signIn } from 'next-auth/client'
import { FunctionComponent } from 'react'

const SignInScreen: FunctionComponent = () => (
  <Center height="100vh">
    <Button onClick={signInWithSpotify}>Sign in with Spotify</Button>
  </Center>
)

const signInWithSpotify = () => signIn('spotify')

export default SignInScreen
