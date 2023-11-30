import { getStyle, getStyles } from 'mongodb/styles'

import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import Layout from 'components/allPages/Layout'
import Breadcrumbs from 'components/orders/Breadcrumbs'
import StyleInfo from 'components/orders/style/StyleInfo'

import { capitalize } from 'functions/utils'
import { setCrumbs } from 'functions/orders'

export default function Style({ style }) {
    const router = useRouter()

    const [ breadcrumbs, setBreadcrumbs ] = useState([])
    
    useEffect(() => {

        if (!router.isReady) { return }
        else {
            const { query: { paths } } = router
            const crumbs = { paths }
            crumbs.paths ? setBreadcrumbs(JSON.parse(crumbs.paths)) : setBreadcrumbs('none')
        }

    }, [router])

    if (router.isFallback) {
        return <h1>The style is loading</h1>
    }

    const pickStyle = () => {
        router.push({
            query: {
                paths: setCrumbs(breadcrumbs, { order: 4, locName: style[0].name, path: window.location.pathname })
            },
            pathname: `/order/styles/${style[0]._id}/customize`,
        }, `/order/styles/${style[0]._id}/customize`)
    }

    return (
        <Layout pageTitle={capitalize(`${style[0].name} ${style[0].type}`)}>

            {breadcrumbs && breadcrumbs !== 'none' ? <Breadcrumbs path={breadcrumbs}></Breadcrumbs> : <></>}

            <StyleInfo style={style[0]} backAction={() => {router.back()}} forwardAction={pickStyle}></StyleInfo>

        </Layout>
    )

}

export async function getStaticPaths() {
    try {
        const { styles, error } = await getStyles(0)
        if (error) throw new Error(error)
        let paths = []

        paths = styles.map((style) => {
            return {
                params: { styleId: style._id },
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
        const { styles, error } = await getStyle(params.styleId)
        if (error) throw new Error(error)
        if (!styles) {
            return {
                notFound: true,
            }
        }
        return {
            props: {
                style: styles,
            }
        }
    } catch (error) {
        console.log('Error:' + error.message)
    }
}