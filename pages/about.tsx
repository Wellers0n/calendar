import Link from 'next/link'

export default function Home() {

  return (
    <div style={{ padding: 20 }}>
      <h1>about page</h1>
      <div>
        <Link href="/">Return Home</Link>
      </div>
    </div>
  )
}
