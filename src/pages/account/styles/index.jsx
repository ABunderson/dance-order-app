
import { getStyles } from 'mongodb/styles'

import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'

import UserContext from 'context/UserContext'
import MessageContext from 'context/MessageContext'

import Layout from 'components/allPages/Layout'
import Line from 'components/Line'
import ShowList from 'components/account/ShowList'
import Button from 'components/Button'
import { Alert } from 'components/allPages/Alert'
import { setWarning } from 'functions/utils'

export default function AllStyles({ styles }) {
    const router = useRouter()

    const { userName, setUserName } = useContext(UserContext)
    const { message, setMessage } = useContext(MessageContext)

    let count = 0

    useEffect(() => {
        if (userName === 'default') {
            router.push('/account/login')
        }

        if (message !== 'default') {
            if (count === 0) setWarning(message)
            setMessage('default')
            count += 1
        }
    },)

    return (
        <Layout pageTitle='Styles'>
            <Alert />

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