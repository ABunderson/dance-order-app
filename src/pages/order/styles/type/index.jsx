import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import Layout from 'components/allPages/Layout'
import Breadcrumbs from 'components/orders/Breadcrumbs'
import Card from 'components/Card'
import Button from 'components/Button'

import FlexRow from 'components/styles/FlexRow'

import { setCrumbs } from 'functions/orders'

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

    const onClick = (type) => {
        router.push({
            query: {
                paths: setCrumbs(breadcrumbs, { order: 2, locName: 'Type', path: window.location.pathname })
            },
            pathname: `/order/styles/type/${type}`,
        }, `/order/styles/type/${type}`)
    }

    return (
        <Layout pageTitle='Choose Type'>
            {breadcrumbs && breadcrumbs !== 'none' ? <Breadcrumbs path={breadcrumbs}></Breadcrumbs> : <></>}
            <h1>Boutonniere or Corsage</h1>
            <FlexRow>
                <Card
                    action={() => {onClick('boutonniere')}}
                    title='Boutonniere'
                    src='/styles/boutonniere/full-rose.jpg'
                    alt='A boutonniere'
                    imageTitle='Boutonniere'
                    description='A boutonniere is what a female traditionally buys for a male'
                >
                </Card>
                <Card
                    action={() => {onClick('corsage')}}
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


