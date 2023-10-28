
import { getStyles } from 'mongoDb/styles'

import UserContext from 'context/UserContext'
import { useContext, useEffect } from 'react'

import Layout from 'components/Layout'
import Line from 'components/Line'
import ShowList from 'components/account/ShowList'
import Link from 'next/link'
import { useRouter } from 'next/router'


export default function AllStyles({ styles }) {
    const router = useRouter()

    const user = useContext(UserContext)

    useEffect(() => {
        if (user.userName === 'default') {
            router.push('/account/login')
        }
    }, [router, user.userName])

    return (
        <Layout pageTitle="Styles">

            <h1>Styles</h1>
            <p>Here you can see, add, edit, or remove any styles.</p>
           <Line></Line>

            <ShowList objects={styles}></ShowList>
 


        </Layout>

    )
}

export async function getStaticProps() {

    try {
        const { styles, error } = await getStyles(0)
        if (error) throw new Error(error)
        return {
            props: {
                styles: styles,
            }
        }
    } catch (error) {
        console.log('Error:' + error.message)
    }
}