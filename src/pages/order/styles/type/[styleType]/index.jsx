// all the styles either bout or cor
import Layout from 'components/Layout'
import Breadcrumbs from 'components/Breadcrumbs'
import { getStylesByType } from 'mongoDb/styles'
import { useRouter } from 'next/router'
import StyleCard from 'components/orders/StyleCard'
import FlexGrid from 'components/orders/FlexGrid'
import { useState, useEffect } from 'react'

export default function GetStyles({ styles }) {

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
    // // const styleId = router.query.productId
    if (router.isFallback) {
        return <h1>Loading:</h1>
    }

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
        pathObj.push({ order: 3, locName: styles[0].type, path: path })
        // console.log('below is pathObj')
        // console.log(pathObj)

        pathString = JSON.stringify(pathObj)
    }


    const chooseStyle = (style) => {
        // console.log(`clicked ${style.name}`)
        // router.push(`/order/styles/${style._id}`)
        router.push({
            query: {
                paths: pathString
            },
            pathname: `/order/styles/${style._id}`,
        }, `/order/styles/${style._id}`)
    }

    return (
        <Layout pageTitle='Styles'>
            <Breadcrumbs path={breadcrumbs}></Breadcrumbs>

            <h1 style={{ textTransform: 'capitalize' }}>Pick {styles[0].type} Style</h1>

            <FlexGrid>
                {styles.map((style) => {
                    return <StyleCard style={style} key={style._id} action={chooseStyle}></StyleCard>
                })}
            </FlexGrid>


        </Layout>
    )
}

export async function getStaticPaths() {
    return {
        paths: [
            {
                params: { styleType: 'corsage' },
            },
            {
                params: { styleType: 'boutonniere' },
            },
        ],
        fallback: true,
    }
}

export async function getStaticProps(context) {
    const { params } = context
    try {
        const { styles, error } = await getStylesByType(params.styleType)
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