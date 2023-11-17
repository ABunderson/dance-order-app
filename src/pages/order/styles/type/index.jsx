import Layout from 'components/allPages/Layout'
import Breadcrumbs from 'components/orders/Breadcrumbs'
import Card from 'components/Card'
import FlexRow from 'components/styles/FlexRow'
import Button from 'components/Button'

import { setCrumbs } from 'functions/orders'

import { useRouter } from 'next/router'
import { useState } from 'react'
import { useEffect } from 'react'

export default function ChooseType() {
    const router = useRouter()
    const [breadcrumbs, setBreadcrumbs] = useState([])

    useEffect(() => {

        if (!router.isReady) { return }
        else {
            const { query: { paths }} = router
            const crumbs = { paths }
            crumbs.paths ? setBreadcrumbs(JSON.parse(crumbs.paths)) : setBreadcrumbs('none')
        }

    }, [router])

    const corClick = () => {
        // console.log('go to cor styles')
        router.push({
            query: {
                paths: setCrumbs(breadcrumbs, { order: 2, locName: 'Type', path: window.location.pathname })
            },
            pathname: '/order/styles/type/corsage',
        }, '/order/styles/type/corsage')
    }

    const boutClick = () => {
        // console.log('go to bout styles')
        router.push({
            query: {
                paths: setCrumbs(breadcrumbs, { order: 2, locName: 'Type', path: window.location.pathname })
            },
            pathname: '/order/styles/type/boutonniere',
        }, '/order/styles/type/boutonniere')
    }

    return (
        <Layout pageTitle='Choose Type'>
            {breadcrumbs ? <Breadcrumbs path={breadcrumbs}></Breadcrumbs> : <></>}
            <h1>Boutonniere or Corsage</h1>
            <FlexRow>
                <Card
                    action={boutClick}
                    title='Boutonniere'
                    src='/styles/boutonniere/full-rose.jpg'
                    alt='A boutonniere'
                    imageTitle='Boutonniere'
                    description='A boutonniere is what a female traditionally buys for a male'
                >
                </Card>
                <Card
                    action={corClick}
                    title='Corsage'
                    src='/styles/corsage/rose.jpg'
                    alt='A corsage'
                    imageTitle='Corsage'
                    description='A corsage is what a male traditionally buys for a female'>
                </Card>
            </FlexRow>
            <Button text='Back' type='button' action={() => { router.back() }}></Button>
        </Layout>
    )
}


