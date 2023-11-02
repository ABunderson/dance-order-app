import Layout from 'components/Layout'
import Breadcrumbs from 'components/Breadcrumbs'
import Card from 'components/Card'
import FlexRow from 'components/orders/flexRow'
import Button from 'components/Button'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useEffect } from 'react'

export default function ChooseType() {
    const router = useRouter()
    const [breadcrumbs, setBreadcrumbs] = useState([])

    useEffect(() => {

        if(!router.isReady) {return}
        else {
        const {
            query: { paths }
        } = router
    
        const crumbs = { paths }
        // console.log(crumbs)
        let pathObj = JSON.parse(crumbs.paths)

        setBreadcrumbs(pathObj)
        }

    }, [router])

    // console.log('try to get breadcrumbs')
    // console.log(breadcrumbs)

    const {
        query: { paths }
    } = router

    const crumbs = { paths }

    let pathString = 'empty'
    let pathObj
    // console.log('on page')
    // console.log(crumbs)

    if (crumbs && crumbs.paths !== 'empty' && typeof crumbs.paths !== 'undefined') {
        pathObj = JSON.parse(crumbs.paths)

        const path = window.location.pathname
        pathObj.push({ order: 2, locName: 'Type', path: path })
        // console.log('below is pathObj')
        // console.log(pathObj)

        pathString = JSON.stringify(pathObj)
    }



    const corClick = () => {
        // console.log('go to cor styles')
        router.push({
            query: {
                paths: pathString
            },
            pathname: '/order/styles/type/corsage',
        }, '/order/styles/type/corsage')
    }

    const boutClick = () => {
        // console.log('go to bout styles')
        router.push({
            query: {
                paths: pathString
            },
            pathname: '/order/styles/type/boutonniere',
        }, '/order/styles/type/boutonniere')
    }

    return (
        <Layout pageTitle='Choose Type'>
            <Breadcrumbs path={breadcrumbs}></Breadcrumbs>
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
            <Button text='Back' type='button' action={()=> {router.back()}}></Button>
        </Layout>
    )
}


