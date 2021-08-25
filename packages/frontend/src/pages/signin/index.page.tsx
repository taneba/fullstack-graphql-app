import { useAuth0 } from '@auth0/auth0-react'
import Link from 'next/link'
import { Button } from 'src/components/Button'

function SignIn() {
  const { loginWithRedirect } = useAuth0()

  return (
    <div>
      <Button onClick={loginWithRedirect}>Sign in</Button>
      if you don't have an account? then <Link href="/signup"> sign up</Link>
    </div>
  )
}

export default SignIn
