


import { getDances } from 'mongoDb/dances'

import { useRouter } from 'next/router'
import UserContext from 'components/UserContext'
import { useContext, useEffect } from 'react'

import Layout from 'components/Layout'
import Line from 'components/Line'
import ShowList from 'components/account/ShowList'
import Button from 'components/Button'
import { Alert } from 'components/Alert'



export default function AllDances({ dances }) {
    const router = useRouter()
    const user = useContext(UserContext)

    useEffect(() => {
        if (user.userName === 'default') {
            router.push('/account/login')
        }
    }, )

    const addDance = () => {
        router.push('/account/dances/create')
    }

    return (
        <Layout pageTitle="Dances">
            <Alert />
            <h1>Dances</h1>
            <p>Here you can see, add, edit, or remove any dances</p>

            <Button text='Add' type='button' action={addDance}></Button>

            <Line></Line>

            <ShowList objects={dances} type={'dances'}></ShowList>
            <Line></Line>

            <Button text='Back' type='button' action={() => {router.push('/account')}}></Button>

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