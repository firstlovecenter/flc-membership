import { Center, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { ClimbingBoxLoader } from 'react-spinners'

const SplashScreen = () => {
  const { colorMode } = useColorMode()

  return (
    <Center height="100vh">
      <ClimbingBoxLoader
        size={20}
        color={colorMode === 'dark' ? 'white' : 'gray'}
      />
    </Center>
  )
}

export default SplashScreen
