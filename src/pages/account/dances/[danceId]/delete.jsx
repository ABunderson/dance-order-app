import { getStyles } from 'mongodb/styles'
import { getDances, getDanceById } from 'mongodb/dances'

import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'

import UserContext from 'context/UserContext'
import MessageContext from 'context/MessageContext'

import { Alert } from 'components/allPages/Alert'
import Layout from 'components/allPages/Layout'
import Button from 'components/Button'
import Line from 'components/Line'
import DanceView from 'components/account/dances/DanceView'
import { FlexButton } from 'components/styles/ButtonStyles'

import { setWarning } from 'functions/utils'

export default function DeleteDance({ styles, dance }) {
    const router = useRouter();

    const { userName, setUserName } = useContext(UserContext)
    const { message, setMessage } = useContext(MessageContext)

    useEffect(() => {
        if (userName === 'default') {
            router.push('/account/login')
        }
    },)

    if (router.isFallback) {
        return <h1>The style is loading</h1>
    }

    const deleteDance = async () => {
        try {
            let res = await fetch(`/api/dances/${dance[0]._id}/delete`, {
                method: 'POST',
            })
            res = await res.json()

            if (res.ok) {
                setMessage('Successfully deleted dance')
                router.back()
            }
        } catch (error) {
            console.log('Error: ' + error.message)
            setWarning('Something went wrong while deleting the dance')
            return
        }
    }

    return (
        <Layout pageTitle='Delete Dance'>

            <Alert />
            
            <h1>Delete Dance</h1>
            <h2>Are you sure you want to delete this dance? This action cannot be undone.</h2>

            <FlexButton>
                <Button text='Delete' type='button' action={deleteDance}></Button>
                <Button text="Back" type="button" action={() => { router.back() }}></Button>
            </FlexButton>

            <Line></Line>

            <DanceView dance={dance} styles={styles}></DanceView>
            <FlexButton><Button text="Back" type="button" action={() => { router.back() }}></Button></FlexButton>

        </Layout>
    )
}

export async function getStaticPaths() {
    try {
        const { dances, error } = await getDances(0)
        if (error) throw new Error(error)

        let paths = []
        paths = dances.map((dance) => {
            return {
                params: { danceId: dance._id },
            }
        })

        return {
            paths,
            fallback: true
        }
    } catch (error) {
        console.log('Error:' + error.message)
    }
}

export async function getStaticProps(context) {
    const { params } = context

    let dance
    try {
        const { dances, error } = await getDanceById(params.danceId)
        if (error) throw new Error(error)
        dance = dances
    } catch (error) {
        console.log('Error:' + error.message)
        return
    }

    let stylesReturn
    try {
        const { styles, error } = await getStyles(0)
        if (error) throw new Error(error)
        stylesReturn = styles
    } catch (error) {
        console.log('Error:' + error.message)
        return
    }

    return {
        props: {
            styles: stylesReturn,
            dance: dance
        }
    }
}