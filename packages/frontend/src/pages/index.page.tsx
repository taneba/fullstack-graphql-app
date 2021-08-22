import Link from 'next/link'

function Home() {
  return (
    <div>
      <h1 tw="text-gold">Home</h1>
      <Link href="/todos">todos</Link>
    </div>
  )
}

export default Home
