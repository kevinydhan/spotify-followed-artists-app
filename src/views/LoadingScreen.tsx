import { Center, CircularProgress, Text } from '@chakra-ui/react'
import type { FunctionComponent } from 'react'

const LoadingScreen: FunctionComponent = () => (
  <Center height="100vh" flexDirection="column">
    <Text marginBottom="4">Fetching data</Text>
    <CircularProgress isIndeterminate />
  </Center>
)

export default LoadingScreen
