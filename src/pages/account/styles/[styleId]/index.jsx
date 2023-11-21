import { getStyles, getStyle } from 'mongoDb/styles'
import { getSupplyByIdArray } from 'mongodb/supplies'

import { useRouter } from 'next/router'
import UserContext from 'context/UserContext'
import { useContext, useEffect, useState } from 'react'

import { alertService } from 'services/alert.service'
import { Alert } from 'components/allPages/Alert'
import { scrollToTop } from 'functions/utils'

import Layout from 'components/allPages/Layout'
import StyleView from 'components/account/styles/StyleView'


import { FlexButton, SmallFlexButton } from 'components/styles/ButtonStyles'
import Button, { SmallButton } from 'components/Button'
import Line from 'components/Line'


export default function ViewStyle({ style, supplies }) {
    const router = useRouter();

    const { userName, setUserName } = useContext(UserContext)


    // useEffect(() => {
    //     if (userName === 'default') {
    //         router.push('/account/login')
    //     }


    // }, [router, userName])


    if (router.isFallback) {
        return <h1>The order is loading</h1>
    }

    return (
        <Layout pageTitle='View Style'>
            <Alert />

            <h1 style={{ textTransform:'capitalize'}}>{style[0].name} {style[0].type}</h1>
            <h2>Here you can see all the information about the {style[0].name} {style[0].type}</h2>

            <Line></Line>

            <StyleView style={style[0]} supplies={supplies}></StyleView>

            <Line></Line>

            <FlexButton>
                <Button text="Back" type="button" action={() => { router.back() }}></Button>
            </FlexButton>

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

        let supplyArray = []

        if (styles[0].supplies.length >= 1) {

            const { supplies, error } = await getSupplyByIdArray(styles[0].supplies)
            if (error) throw new Error(error)
            if (!styles) {
                return {
                    notFound: true,
                }
            }
            supplyArray = supplies
        }

        return {
            props: {
                style: styles,
                supplies: supplyArray,
            }
        } 

    } catch (error) {
        console.log('Error:' + error.message)
    }
}