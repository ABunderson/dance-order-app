import { getStyle, getStyles } from 'mongodb/styles'
import { getFlowerByName } from 'mongodb/flowers'
import { getSupplyByIdArray } from 'mongodb/supplies'

import { useRouter } from 'next/router'
import { useState, useEffect, useContext } from 'react'

import OrderContext from 'context/OrderContext'
import DanceContext from 'context/DanceContext'

import Layout from 'components/allPages/Layout'
import Breadcrumbs from 'components/orders/Breadcrumbs'
import CustomizeForm from 'components/orders/customize/CustomizeForm'
import { Alert } from 'components/allPages/Alert'

import { setWarning, capitalize } from 'functions/utils'
import { setCrumbs } from 'functions/orders'

export default function Customize({ style, flower, supplies }) {
    const router = useRouter()

    const { orderNumber, setOrderNumber } = useContext(OrderContext)
    const { danceNumber, setDanceNumber } = useContext(DanceContext)

    const [ breadcrumbs, setBreadcrumbs ] = useState([])
    const [ danceColors, setDanceColors ] = useState([])

    useEffect(() => {

        if (!router.isReady) return
        else {
            const { query: { paths } } = router
            const crumbs = { paths }
            crumbs.paths ? setBreadcrumbs(JSON.parse(crumbs.paths)) : setBreadcrumbs('none')
        }

        if (danceColors.length === 0 && danceNumber !== 'default') {
            getOutputColors()
        }

        // this gets the flower colors that are available for the dance if they are specified or returns the default colors
        async function getOutputColors() {

            try {
                const response = await fetch(`/api/dances/${danceNumber}`)
                const data = await response.json()
                const danceInfo = data.dances[0]

                let flowerInfo = danceInfo.flowers.filter((item) => {
                    return item.flowerName === flower[0].name
                })

                setDanceColors(flowerInfo)

            } catch (error) {
                console.log('Error: ' + error.message)
                setWarning('Something has gone wrong with the database connection')
                return
            }
        }

    }, [router, danceNumber, danceColors.length, flower])


    if (router.isFallback) {
        return <h1>Loading. . .</h1>
    }

    async function onSubmit(event) {

        event.preventDefault()

        if (typeof window !== undefined) {
            const formData = new FormData(event.target),
                convertedJSON = {};

            formData.forEach(function (value, key) {
                convertedJSON[key] = value;
            });

            const styleObj = {}
            styleObj.style = { ...convertedJSON, name: style[0].name, type: style[0].type, price: style[0].price, flower: style[0].flower, pageColor: style[0].pageColor }

            try {
                let res = await fetch(`/api/orders/${orderNumber}/update`, {
                    method: 'POST',
                    body: JSON.stringify(styleObj),
                })

                res = await res.json()

                if (res.result.ok === 1) {

                    router.push({
                        query: {
                            paths: setCrumbs(breadcrumbs, { order: 5, locName: 'Customize', path: window.location.pathname })
                        },
                        pathname: `/order/styles/type/${style[0].type}/addons`,
                    }, `/order/styles/type/${style[0].type}/addons`)
                }
            } catch (error) {
                console.log('Error ' + error.message)
                setWarning('Something has gone wrong with the database connection')
                return
            }
        }
    }

    return (
        <Layout pageTitle={capitalize(`Customize ${style[0].name} ${style[0].type}`)}>
            <Alert />

            {breadcrumbs && breadcrumbs !== 'none' ? <Breadcrumbs path={breadcrumbs}></Breadcrumbs> : <></>}

            <h1 style={{ textTransform: 'capitalize' }}>Customize {style[0].name} {style[0].type}</h1>
            <CustomizeForm backAction={() => {router.back()}} forwardAction={onSubmit} flower={flower} flowerColors={danceColors} supplies={supplies} styleId={style[0]._id}></CustomizeForm>

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

        let flowerArray = []
        if (styles[0].flower) {
            const { flowers, error } = await getFlowerByName(styles[0].flower)
            if (error) throw new Error(error)
            if (!styles) {
                return {
                    notFound: true,
                }
            }
            flowerArray = flowers
        }

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
                flower: flowerArray,
                supplies: supplyArray,
            }
        } 
    } catch (error) { 
        console.log('Error:' + error.message)
    }
}