// import Image from 'next/image'
// import styles from '@/styles/Home.module.css'
// import Layout from 'components/Layout'
// import { LargeButton } from 'components/Button.js'



// export default function Home() {
//   return (
//     <Layout pageTitle='Home'>
//        <Image
//           className={styles.hero}
//           src="/hero.jpg"
//           alt="A matching corsage and boutonniere set made with white ranunculus"
//           height={2468}
//           width={4032}
//           priority
//         />

//         <LargeButton text="Order now!"></LargeButton>

//         <h1>What We Do</h1>
//         <p>This site makes ordering a boutonniere or corsage for yourself or your child an easy painless process. The choices for style, flower, and color choice have pictures to show what you will be getting, and you can pick how styles are arranged based on what is important to you. This site is only available at the florists and will not be available from other locations/wi-fi networks.</p>
        
//         <h2>What We Recommend</h2>
//         <p>Picking out the perfect dance flower can be hard. To get a gorgeous creation we recommend choosing a color of flower that is NOT white. School dances are fun, and boutonnieres and corsages should be fun too! Spice up a design by adding a color that coordinates or highlights the color of the dress. If you have questions about which fun color can go with your dress, please ask one of our experienced designers for help.</p>
//     </Layout>
//   )
// }

// // export default function Home() {
// //   return (
// //     <>
// //       <Head>
// //         <title>TPD Dance Orders</title>
// //         <meta name="description" content="Order a Boutonniere or Corsage with TPD Florist" />
// //         <meta name="viewport" content="width=device-width, initial-scale=1" />
// //         <link rel="icon" href="/icons/favicon.png" />
// //       </Head>

// //       <Header />

// //       <main className={styles.main}>

// //         <Image
// //           className={styles.hero}
// //           src="/hero.jpg"
// //           alt="A matching corsage and boutonniere set made with white ranunculus"
// //           height={2468}
// //           width={4032}
// //           priority
// //         />

// //         <LargeButton text="Order now!"></LargeButton>

// //         <h1>What We Do</h1>
// //         <p>This site makes ordering a boutonniere or corsage for yourself or your child an easy painless process. The choices for style, flower, and color choice have pictures to show what you will be getting, and you can pick how styles are arranged based on what is important to you. This site is only available at the florists and will not be available from other locations/wi-fi networks.</p>
        
// //         <h2>What We Recommend</h2>
// //         <p>Picking out the perfect dance flower can be hard. To get a gorgeous creation we recommend choosing a color of flower that is NOT white. School dances are fun, and boutonnieres and corsages should be fun too! Spice up a design by adding a color that coordinates or highlights the color of the dress. If you have questions about which fun color can go with your dress, please ask one of our experienced designers for help.</p>

// //       </main>

// //       <Footer />
// //     </>
// //   )
// // }

import Link from 'next/link';
import { userService } from '../../services/user.services'

export default Home;

function Home() {
    return (
        <div className="p-4">
            <div className="container">
                <h1>Hi {userService.userValue?.firstName}!</h1>
                <p>You're logged in with Next.js & JWT!!</p>
                <p><Link href="/users">Manage Users</Link></p>
            </div>
        </div>
    );
}