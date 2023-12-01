import { getAddonsByType } from 'mongodb/addons'
import { getSupplyByName } from 'mongodb/supplies'

import { useRouter } from 'next/router'
import { useState, useEffect, useContext } from 'react'

import OrderContext from 'context/OrderContext'
import MessageContext from 'context/MessageContext'

import Layout from 'components/allPages/Layout'
import Breadcrumbs from 'components/orders/Breadcrumbs'
import AddonForm from 'components/orders/addons/AddonForm'
import { Alert } from 'components/allPages/Alert'

import { setWarning } from 'functions/utils'
import { setCrumbs } from 'functions/orders'

export default function GetStyles({ addons, ribbon }) {
    const router = useRouter()

    const { orderNumber, setOrderNumber } = useContext(OrderContext)
    const { message, setMessage } = useContext(MessageContext)

    const [breadcrumbs, setBreadcrumbs] = useState([])
    const [orderInfo, setOrderInfo] = useState([])

    useEffect(() => {
        if (orderNumber === 'default') {
            setMessage('The order was lost or did not exist')
            router.push('/')
        }

        if (!router.isReady) {
            return
        } else {
            const { query: { paths } } = router
            const crumbs = { paths }
            crumbs.paths ? setBreadcrumbs(JSON.parse(crumbs.paths)) : setBreadcrumbs('none')
        }

        try {
            if (orderInfo.length === 0) {
                orderNumber === 'default' ? router.push('/') : getOrder()
            }

            async function getOrder() {
                const response = await fetch(`/api/orders/${orderNumber}`)
                const data = await response.json()
                const orderJson = data.orders[0]

                setOrderInfo(orderJson)
            }

        } catch (error) {
            console.log('Error: ' + error)
            setWarning('Something has gone wrong with the database connection')
            return
        }

    }, [router, orderNumber, orderInfo.length, setMessage])

    if (router.isFallback) {
        return <h1>Loading:</h1>
    }

    async function onSubmit(event) {
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

                newObj.name ? addOnArr.push(newObj) : ''
            })

            let sendingThis = {}
            sendingThis.addon = addOnArr

            try {
                let res = await fetch(`/api/orders/${orderNumber}/update`, {
                    method: 'POST',
                    body: JSON.stringify(sendingThis),
                })
                res = await res.json()

                if (res.result.ok === 1) {
                    router.push({
                        query: {
                            paths: setCrumbs(breadcrumbs, { order: 6, locName: 'Finishing Touches', path: window.location.pathname })
                        },
                        pathname: `/order`,
                    }, `/order`)
                }
            } catch (error) {
                console.log('Error: ' + error.message)
                setWarning('Something has gone wrong with the database connection')
            }
        }
    }

    return (
        <Layout pageTitle='Finishing Touches'>
            <Alert />
            {breadcrumbs && breadcrumbs !== 'none' ? <Breadcrumbs path={breadcrumbs}></Breadcrumbs> : <></>}

            <h1 style={{ textTransform: 'capitalize' }}>Finishing Touches</h1>

            <AddonForm backAction={() => { router.back() }} forwardAction={onSubmit} addons={addons} ribbon={ribbon} order={orderInfo}></AddonForm>


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