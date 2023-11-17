import Layout from 'components/allPages/Layout'
import Breadcrumbs from 'components/orders/Breadcrumbs'
import { getStyle, getStyles } from 'mongoDb/styles'
import { useRouter } from 'next/router'

import { getFlowerByName } from 'mongoDb/flowers'
import { getSupplyByNameArray } from 'mongoDb/supplies'
import CustomizeForm from 'components/orders/customize/CustomizeForm'
import OrderContext from 'context/OrderContext'
import DanceContext from 'context/DanceContext'
import { useState, useEffect, useContext } from 'react'
import { capitalize } from 'functions/utils'

import { Alert } from 'components/allPages/Alert'
import { alertService } from 'services/alert.service'
import { scrollToTop } from 'functions/utils'
import { setCrumbs } from 'functions/orders'



export default function Customize({ style, flower, supplies }) {
    const [breadcrumbs, setBreadcrumbs] = useState([])
    const [danceColors, setDanceColors] = useState([])

    const router = useRouter()
    const { orderNumber, setOrderNumber } = useContext(OrderContext)
    const { danceNumber, setDanceNumber } = useContext(DanceContext)

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
                alertService.warn('Something has gone wrong with the database connection.', { autoClose: false, keepAfterRouteChange: false })
                scrollToTop()
            }
        }

    }, [router, danceNumber, danceColors.length, flower])


    if (router.isFallback) {
        return <h1>Loading. . .</h1>
    }

    const goBack = () => {

        router.back()
    }

    async function onSubmit(event) {

        event.preventDefault()

        if (typeof window !== undefined) {
            const formData = new FormData(event.target),
                convertedJSON = {};

            formData.forEach(function (value, key) {
                convertedJSON[key] = value;
            });

            const orderId = orderNumber
            const styleObj = {}
            styleObj.style = { ...convertedJSON, name: style[0].name, type: style[0].type, price: style[0].price, flower: style[0].flower, pageColor: style[0].pageColor }

            try {
                let res = await fetch(`/api/orders/${orderId}/update`, {
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
                alertService.warn('Something has gone wrong with the database connection.', { autoClose: false, keepAfterRouteChange: false })
                console.log('Error ' + error.message)
                scrollToTop()
            }


        }

    }

    return (
        <Layout pageTitle={capitalize(`Customize ${style[0].name} ${style[0].type}`)}>
            <Alert />

            {breadcrumbs ? <Breadcrumbs path={breadcrumbs}></Breadcrumbs> : <></>}

            <h1 style={{ textTransform: 'capitalize' }}>Customize {style[0].name} {style[0].type}</h1>
            <CustomizeForm backAction={goBack} forwardAction={onSubmit} flower={flower} flowerColors={danceColors} supplies={supplies} styleId={style[0]._id}></CustomizeForm>


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

        if (styles[0].ribbon || styles[0].metalBack || styles[0].wristlet) {

            let searchArray = []
            styles[0].ribbon ? searchArray.push('ribbon') : ''
            styles[0].metalBack ? searchArray.push('metal back') : ''
            styles[0].wristlet && styles[0].wristlet !== 'elastic' ? searchArray.push(styles[0].wristlet) : ''

            const { supplies, error } = await getSupplyByNameArray(searchArray)
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