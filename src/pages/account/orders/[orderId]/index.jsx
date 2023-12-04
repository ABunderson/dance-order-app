import { getOrders, getOrderById } from 'mongodb/orders'

import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'

import UserContext from 'context/UserContext'

import { Alert } from 'components/allPages/Alert'
import Layout from 'components/allPages/Layout'
import PrintView from 'components/orders/finalize/PrintView'
import { FlexButton, SmallFlexButton } from 'components/styles/ButtonStyles'
import Button, { SmallButton } from 'components/Button'
import Line from 'components/Line'

import { setWarning } from 'functions/utils'

export default function ViewOrder({ orders }) {
    const router = useRouter();

    const { userName, setUserName } = useContext(UserContext)

    const [status, setStatus] = useState('')

    useEffect(() => {
        if (userName === 'default') {
            router.push('/account/login')
        }

        if (status.length === 0) {
            orders[0].finishType && status !== orders[0].finishType ? setStatus(orders[0].finishType) : setStatus('unknown')
        }
    }, [status, orders, router, userName])


    if (router.isFallback) {
        return <h1>The order is loading</h1>
    }

    const print = async () => {
        const sendObject = {}
        try {
            sendObject.finishType = 'print'

            let res = await fetch(`/api/orders/${orders[0]._id}/update`, {
                method: 'POST',
                body: JSON.stringify(sendObject),
            })
            res = await res.json()

            if (res.ok) {
                window.print()
                setStatus('print')
            }
        } catch (error) {
            console.log('Error: ' + error.message)
            setWarning('Something went wrong with the database connection')
            return
        }
    }

    const unsetPrint = async () => {
        const sendObject = {}

        try {
            sendObject.finishType = 'wait'

            let res = await fetch(`/api/orders/${orders[0]._id}/update`, {
                method: 'POST',
                body: JSON.stringify(sendObject),
            })
            res = await res.json()

            res.ok ? setStatus('wait') : setWarning('Could not update the print value')
        } catch (error) {
            console.log('Error: ' + error.message)
            setWarning('Something went wrong with the database connection')
            return
        }
    }

    return (
        <Layout pageTitle='View Order'>
            <Alert />

            <h1>View Order</h1>
            <h2>Orders appear as they will be printed. They cannot be edited.</h2>
            <p>If the screen is small the order will be condensed but will still print normally.</p>

            <SmallFlexButton>
                <SmallButton text='Set as Not Printed' type='button' action={unsetPrint}></SmallButton>
                <SmallButton text='Print' type='button' action={print}></SmallButton>
            </SmallFlexButton>

            <Line></Line>
            <h3>This order has {status === 'print' ? 'been printed.' : 'not been printed.'}</h3>
            <PrintView order={orders[0]} id='noPrint'></PrintView>

            <FlexButton>
                <Button text='Back' type='button' action={() => { router.back() }}></Button>
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