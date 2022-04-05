import { useAuth0 } from '@auth0/auth0-react'
import Link from 'next/link'

import { Button } from '~/components'
import { Role } from '~/generated/graphql'

function SignIn() {
  const { loginWithRedirect } = useAuth0()

  const loginAsUser = () => {
    loginWithRedirect({
      role: Role.User,
    })
  }

  return (
    <div>
      <Button primary onClick={loginAsUser}>
        Sign in
      </Button>
      <div>
        if you don't have an account? then
        {/* <Link href="/signup">
          <span tw="text-blue-500 cursor-pointer">sign up</span>
        </Link> */}
        <Button secondary tw="ml-1" onClick={loginAsUser}>
          Sign up
        </Button>
      </div>
    </div>
  )
}

export default SignIn
