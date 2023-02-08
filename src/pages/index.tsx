import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>TodoGachi</title>
        <meta name="description" content="Let your pets motivate you to check off todo items" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='title'> {/* proof of SCSS working if you see the link in blue */}
        Navigate to <Link href="/login">login</Link>
      </div>
    </>
  )
}

