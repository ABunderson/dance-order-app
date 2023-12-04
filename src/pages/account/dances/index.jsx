import { getDances } from 'mongodb/dances'

import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'

import UserContext from 'context/UserContext'
import MessageContext from 'context/MessageContext'

import Layout from 'components/allPages/Layout'
import Line from 'components/Line'
import ShowList from 'components/account/ShowList'
import Button from 'components/Button'
import { Alert } from 'components/allPages/Alert'

export default function AllDances({ dances }) {
    const router = useRouter()

    const { userName, setUserName } = useContext(UserContext)
    const { message, setMessage } = useContext(MessageContext)

    let count = 1

    useEffect(() => {
        if (userName === 'default') {
            router.push('/account/login')
        }

        if (message !== 'default') {
            if (count === 0) alertService.warn(message, { autoClose: false, keepAfterRouteChange: false })
            setMessage('default')
            count += 1
        }
    },)

    return (
        <Layout pageTitle="Dances">

            <Alert />
            <h1>Dances</h1>
            <p>Here you can see, add, edit, or remove any dances</p>

            <Button text='Add' type='button' action={() => { router.push('/account/dances/create') }}></Button>

            <Line></Line>

            <ShowList objects={dances} type={'dances'}></ShowList>
            <Line></Line>

            <Button text='Back' type='button' action={() => { router.push('/account') }}></Button>

        </Layout>
    )
}

export async function getStaticProps() {
    try {
        const { dances, error } = await getDances(0)
        if (error) throw new Error(error)
        return {
            props: {
                dances: dances,
            }
        }
    } catch (error) {
        console.log('Error:' + error.message)
    }
}