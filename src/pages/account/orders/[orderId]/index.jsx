import { getOrders, getOrderById } from 'mongoDb/orders'

import { useRouter } from 'next/router'
import UserContext from 'context/UserContext'
import { useContext, useEffect, useState } from 'react'

import { alertService } from 'services/alert.service'
import { Alert } from 'components/Alert'
import Layout from 'components/Layout'
import FinalizeOutput from '../../../../../components/orders/FinalizeOutput'
import PrintView from 'components/orders/finalize/PrintView'

import { FlexButton, SmallFlexButton } from 'components/styles/ButtonStyles'
import Button, { SmallButton } from 'components/Button'
import Line from 'components/Line'


export default function ViewOrder({ orders }) {
    const router = useRouter();

    const user = useContext(UserContext)
    const [status, setStatus] = useState('')

    useEffect(() => {
        // if (user.userName === 'default') {
        //     router.push('/account/login')
        // }

        if (status.length === 0){
            orders[0].finishType && status !== orders[0].finishType ? setStatus(orders[0].finishType) : setStatus('unknown')
        }
    }, [status, orders])


    if (router.isFallback) {
        return <h1>The order is loading</h1>
    }

    const print = async () => {
        const sendObject = {}
        sendObject.finishType = 'print'

        let res = await fetch(`/api/orders/${orders[0]._id}/update`, {
            method: 'POST',
            body: JSON.stringify(sendObject),
        })
        res = await res.json()
        // console.log(res)

        if (res.ok) {  
            window.print()
            setStatus('print')
        }
    }

    const unsetPrint = async () => {
        const sendObject = {}
        sendObject.finishType = 'wait'

        // setStatus('wait')

        let res = await fetch(`/api/orders/${orders[0]._id}/update`, {
            method: 'POST',
            body: JSON.stringify(sendObject),
        })
        res = await res.json()
        // console.log(res)
        res.ok ? setStatus('wait') : alertService.warn('Something went wrong', { autoClose: false, keepAfterRouteChange: false })
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