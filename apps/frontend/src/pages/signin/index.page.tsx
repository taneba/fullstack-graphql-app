import { useAuth0 } from '@auth0/auth0-react'
import { Button, Theme, useTheme, XStack, YStack } from 'ui'

import { Role } from '~/generated/graphql'

function SignIn() {
  const { loginWithRedirect } = useAuth0()

  const loginAsUser = () => {
    loginWithRedirect({
      role: Role.User,
    })
  }
  const theme = useTheme()
  theme.backgroundFocus

  return (
    <YStack alignItems="flex-start" space="$5" mt="$7">
      <Button onPress={loginAsUser}>Sign in</Button>

      <XStack alignItems="center">
        if you don't have an account? then
        <Button chromeless onPress={loginAsUser} ml="$1">
          Sign up
        </Button>
      </XStack>
    </YStack>
  )
}

export default SignIn
