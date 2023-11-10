import { getOrders, getOrderById } from 'mongoDb/orders'

import { useRouter } from 'next/router'
import UserContext from 'context/UserContext'
import { useContext, useEffect } from 'react'

import { alertService } from 'services/alert.service'
import { Alert } from 'components/Alert'
import Layout from 'components/Layout'
import FinalizeOutput from '../../../../../components/orders/FinalizeOutput'
import PrintView from 'components/orders/finalize/PrintView'

import { FlexButton } from 'components/styles/ButtonStyles'
import Button from 'components/Button'
import Line from 'components/Line'


export default function ViewOrder({ orders }) {
    // console.log(orders)

    const router = useRouter();

    const user = useContext(UserContext)

    // useEffect(() => {
    //     if (user.userName === 'default') {
    //         router.push('/account/login')
    //     }
    // }, )

    if (router.isFallback) {
        return <h1>The order is loading</h1>
    }


    return (
        <Layout pageTitle='View Order'>

            <Alert />
            <h1>View Order</h1>
            <h2>Orders appear as they will be printed. They cannot be edited.</h2>

            <Line></Line>
            <h3>This order has {orders[0].finishType === 'print' ? 'been printed.' : 'not been printed.'}</h3>
            <PrintView order={orders[0]} id=''></PrintView>

            <FlexButton>
                <Button text="Back" type="button" action={() => { router.back() }}></Button>
            </FlexButton>

        </Layout>
    )
}

export async function getStaticPaths() {
    try {
        const { orders, error } = await getOrders(0)
        if (error) throw new Error(error)
        let paths = []
        paths = orders.map((order) => {
            return {
                params: { orderId: order._id },
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
        const { orders, error } = await getOrderById(params.orderId)
        if (error) throw new Error(error)
        return {
            props: {
                orders: orders
            }
        }
    } catch (error) {
        console.log('Error:' + error.message)
    }
}