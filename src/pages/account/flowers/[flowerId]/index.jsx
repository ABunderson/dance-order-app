import { getFlowers, getFlower } from 'mongodb/flowers'

import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'

import UserContext from 'context/UserContext'

import Layout from 'components/allPages/Layout'
import FlowerView from 'components/account/flowers/FlowerView'
import { FlexButton } from 'components/styles/ButtonStyles'
import Button from 'components/Button'
import Line from 'components/Line'

import { capitalize } from 'functions/utils'

export default function ViewFlower({ flower }) {
    const router = useRouter();

    const { userName, setUserName } = useContext(UserContext)

    useEffect(() => {
        if (userName === 'default') {
            router.push('/account/login')
        }
    }, [router, userName])


    if (router.isFallback) {
        return <h1>The order is loading</h1>
    }

    return (
        <Layout pageTitle='View Flower'>

            <h1>{capitalize(flower[0].name)}</h1>
            <h2>Here you can see all the information about the {flower[0].name}.</h2>

            <Line></Line>

            <FlowerView flower={flower[0]}></FlowerView>

            <Line></Line>

            <FlexButton>
                <Button text='Back' type='button' action={() => { router.back() }}></Button>
            </FlexButton>

        </Layout>
    )
}

export async function getStaticPaths() {
    try {
        const { flowers, error } = await getFlowers(0)
        if (error) throw new Error(error)

        let paths = []
        paths = flowers.map((flower) => {
            return {
                params: { flowerId: flower._id },
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

    try {
        const { flowers, error } = await getFlower(params.flowerId)
        if (error) throw new Error(error)

        return {
            props: {
                flower: flowers,
            }
        }

    } catch (error) {
        console.log('Error:' + error.message)
    }
}