import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
import Button from '../components/Button.js'


export default function Home() {
  return (
    <>
      <Head>
        <title>TPD Dance Orders</title>
        <meta name="description" content="Order a Boutonniere or Corsage with TPD Florist" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icons/favicon.png" />
      </Head>

      <Header />

      <main className={styles.main}>

        <Image
          className={styles.hero}
          src="/hero.jpg"
          alt="A matching corsage and boutonniere set made with white ranunculus"
          height={2468}
          width={4032}
        />

        <Button text="Order now!" size="Large"></Button>

        <h1>What We Do</h1>
        <p>This site makes ordering a boutonniere or corsage for yourself or your child an easy painless process. The choices for style, flower, and color choice have pictures to show what you will be getting, and you can pick how styles are arranged based on what is important to you. This site is only available at the florists and will not be available from other locations/wi-fi networks.</p>
        
        <h2>What We Recommend</h2>
        <p>Picking out the perfect dance flower can be hard. To get a gorgeous creation we recommend choosing a </p>

      </main>

      <Footer />
    </>
  )
}
