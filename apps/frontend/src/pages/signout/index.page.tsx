import { useAuth0 } from '@auth0/auth0-react'
import { Button } from 'ui'

function SignOut() {
  const { logout } = useAuth0()
  return <Button onClick={() => logout()}>Sign Out</Button>
}

export default SignOut
