import { getOrders, getOrderById } from 'mongodb/orders'

import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'

import UserContext from 'context/UserContext'
import MessageContext from 'context/MessageContext'

import { alertService } from 'services/alert.service'
import { Alert } from 'components/allPages/Alert'
import Layout from 'components/allPages/Layout'
import PrintView from 'components/orders/finalize/PrintView'
import Button from 'components/Button'
import Line from 'components/Line'

import { scrollToTop, setWarning } from 'functions/utils'

export default function DeleteOrder({ orders }) {
    const router = useRouter();

    const { userName, setUserName } = useContext(UserContext)
    const { message, setMessage } = useContext(MessageContext)

    useEffect(() => {
        if (userName === 'default') {
            router.push('/account/login')
        }
    },)

    if (router.isFallback) {
        return <h1>The order is loading</h1>
    }

    const deleteOrder = async () => {
        try {
            let res = await fetch(`/api/orders/${orders[0]._id}/delete`, {
                method: 'POST',
            })
            res = await res.json()

            if (res.ok) {
                setMessage('Successfully deleted order')
                router.back()
            }
        } catch (error) {
            console.log('Error: ' + error.message)
            setWarning('Something went wrong with the database connnection')
            return
        }
    }

    return (
        <Layout pageTitle='Delete Order'>
            <Alert />

            <h1>Delete Order</h1>
            <h2>Are you sure you want to delete this order? This action cannot be undone.</h2>

            <Button text='Delete' type='button' action={deleteOrder}></Button>

            <Line></Line>
            <h3>This order has {orders[0].finishType === 'print' ? 'been printed.' : 'not been printed.'}</h3>
            <PrintView order={orders[0]} id='noPrint'></PrintView>

            <Button text='Back' type='button' action={() => { router.back() }}></Button>
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