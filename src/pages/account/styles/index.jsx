
import { getStyles } from 'mongoDb/styles'

import UserContext from 'context/UserContext'
import { useContext, useEffect } from 'react'

import Layout from 'components/allPages/Layout'
import Line from 'components/Line'
import ShowList from 'components/account/ShowList'
import Button from 'components/Button'
import Link from 'next/link'
import { useRouter } from 'next/router'


export default function AllStyles({ styles }) {
    const router = useRouter()

    const { userName, setUserName } = useContext(UserContext)

    useEffect(() => {
        // if (userName === 'default') {
        //     router.push('/account/login')
        // }
    }, [router, userName])

    return (
        <Layout pageTitle="Styles">

            <h1>Styles</h1>
            <p>Here you can see, add, edit, or remove any styles.</p>

            <Button text='Create' type='button' action={() => {router.push('/account/styles/create')}}></Button>

            <Line></Line>

            <ShowList objects={styles} type='styles'></ShowList>

            <Line></Line>

            <Button text='Back' type='button' action={() => {router.push('/account')}}></Button>

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