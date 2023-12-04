
import { getFlowers } from 'mongodb/flowers'

import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'

import UserContext from 'context/UserContext'
import MessageContext from 'context/MessageContext'

import { Alert } from 'components/allPages/Alert'
import Layout from 'components/allPages/Layout'
import Line from 'components/Line'
import ShowList from 'components/account/ShowList'
import Button from 'components/Button'

export default function AllFlowers({ flowers }) {
    const router = useRouter()

    const { userName, setUserName } = useContext(UserContext)
    const { message, setMessage } = useContext(MessageContext)

    let count = 0

    useEffect(() => {
        // if (userName === 'default') {
        //     router.push('/account/login')
        // }

        if (message !== 'default') {
            if (count === 0) alertService.warn(message, { autoClose: false, keepAfterRouteChange: false })
            setMessage('default')
            count += 1
        }
    }, [router, userName])

    return (
        <Layout pageTitle='Flowers'>

            <Alert />

            <h1>Flowers</h1>
            <p>Here you can see, add, edit, or remove any Flowers.</p>

            <Button text='Create' type='button' action={() => {router.push('/account/flowers/create')}}></Button>

            <Line></Line>

            <ShowList objects={flowers} type='flowers'></ShowList>

            <Line></Line>

            <Button text='Back' type='button' action={() => {router.push('/account')}}></Button>

        </Layout>

    )
}

export async function getStaticProps() {

    try {
        const { flowers, error } = await getFlowers(0)
        if (error) throw new Error(error)
        return {
            props: {
                flowers: flowers,
            }
        }
    } catch (error) {
        console.log('Error:' + error.message)
    }
}