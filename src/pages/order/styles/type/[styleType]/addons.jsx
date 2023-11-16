// all the styles either bout or cor
import Layout from 'components/allPages/Layout'
import Breadcrumbs from 'components/orders/Breadcrumbs'
import { useRouter } from 'next/router'
import { getAddonsByType } from 'mongoDb/addons'
import AddonForm from 'components/orders/addons/AddonForm'
import { getSupplyByName } from 'mongoDb/supplies'
import { useState, useEffect, useContext } from 'react'
import OrderContext from 'context/OrderContext'

import { Alert } from 'components/allPages/Alert'
import { alertService } from 'services/alert.service'
import { scrollToTop } from 'functions/utils'

export default function GetStyles({ addons, ribbon }) {
    const [breadcrumbs, setBreadcrumbs] = useState([])
    const [orderInfo, setOrderInfo] = useState([])
    const router = useRouter()
    const order = useContext(OrderContext)

    useEffect(() => {

        if (!router.isReady) {
            return
        } else {
            const {
                query: { paths }
            } = router

            const crumbs = { paths }
            if (crumbs && crumbs.paths !== 'empty' && typeof crumbs.paths !== 'undefined') {
                // console.log(crumbs)
                let pathObj = JSON.parse(crumbs.paths)

                setBreadcrumbs(pathObj)
            }
        }

        if (orderInfo.length === 0) {
            order.orderNumber === 'default' ? router.push('/') : getOrder()
        }

        async function getOrder() {
            const orderId = order.orderNumber

            const response = await fetch(`/api/orders/${orderId}`)
            const data = await response.json()
            const orderJson = data.orders[0]

            setOrderInfo(orderJson)
        }

    }, [router, order, orderInfo.length])

    if (router.isFallback) {
        return <h1>Loading:</h1>
    }


    const goBack = () => {
        router.back()
    }

    async function onSubmit(event) {
        // console.log('submit')
        event.preventDefault()


        if (typeof window !== undefined) {
            const formData = new FormData(event.target),
                convertedJSON = {};

            formData.forEach(function (value, key) {
                if (value === '0' || value === '') {
                    // console.log('empty')
                } else {
                    convertedJSON[key] = value;
                }
            });
            // console.log(addons)
            // console.log(convertedJSON)
            const addOnArr = []

            addons.map((addon) => {

                const searchValue = addon.name.split(' ')[0]
                let newObj = {}

                for (let key of Object.keys(convertedJSON)) {

                    if (key.toLowerCase().includes(searchValue.toLowerCase())) {

                        newObj.name = addon.name

                        if (addon.colors === 'ribbon') {
                            newObj.color = convertedJSON.ribbonColor
                            newObj.price = addon.price

                        } else if (!addon.colors) {
                            newObj.price = addon.price

                        } else {
                            if (key.toLowerCase().includes('color')) {
                                newObj.color = convertedJSON[key]
                                newObj.price = addon.price
                            }
                            if (key.toLowerCase().includes('quantity')) {
                                newObj.quantity = convertedJSON[key]
                                newObj.price = Number(convertedJSON[key]) * addon.price
                            }
                        }
                    }

                }
                // console.log(newObj)
                newObj.name ? addOnArr.push(newObj) : ''
            })

            // console.log(addOnArr.length)
            let sendingThis = {}
            sendingThis.addon = addOnArr

            const orderId = order.orderNumber

            let res

            try {
                res = await fetch(`/api/orders/${orderId}/update`, {
                    method: 'POST',
                    body: JSON.stringify(sendingThis),
                })
                res = await res.json()
                // console.log(res.result.ok)
                // console.log(res._id)

                let pathString = 'empty'
                let pathObj

                if (breadcrumbs) {
                    pathObj = breadcrumbs

                    const path = window.location.pathname
                    pathObj.push({ order: 6, locName: 'Finishing Touches', path: path })

                    pathString = JSON.stringify(pathObj)
                }

                if (res.result.ok === 1) {
                    router.push({
                        query: {
                            paths: pathString
                        },
                        pathname: `/order`,
                    }, `/order`)
                }
            } catch (error) {
                console.log('Error: ' + error.message)
                alertService.warn('Something has gone wrong with the database connection.', { autoClose: false, keepAfterRouteChange: false })
                scrollToTop()
            }
        }
    }

    return (
        <Layout pageTitle='Finishing Touches'>
            <Alert />
            {breadcrumbs ? <Breadcrumbs path={breadcrumbs}></Breadcrumbs> : <></>}

            <h1 style={{ textTransform: 'capitalize' }}>Finishing Touches</h1>

            <AddonForm backAction={goBack} forwardAction={onSubmit} addons={addons} ribbon={ribbon} order={orderInfo}></AddonForm>


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
        const { addons, error } = await getAddonsByType(params.styleType)
        if (error) throw new Error(error)

        const { supplies, Serror } = await getSupplyByName('ribbon')
        if (Serror) throw new Error(Serror)

        return {
            props: {
                addons: addons,
                ribbon: supplies,
            }
        }
    } catch (error) {
        console.log('Error:' + error.message)
    }

}