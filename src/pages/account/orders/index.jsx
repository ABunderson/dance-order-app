


import { getOrders } from 'mongoDb/orders'

import { useRouter } from 'next/router'
import UserContext from 'context/UserContext'
import { useContext, useEffect } from 'react'
import { useState } from 'react'

import Layout from 'components/Layout'
import Line from 'components/Line'
import ShowOrders from 'components/account/orders/ShowOrders'
import Button, { SmallButton } from 'components/Button'
import { Alert } from 'components/Alert'
import { SmallFlexButton } from 'components/styles/ButtonStyles'



export default function AllOrders({ orders }) {
    const router = useRouter()
    const user = useContext(UserContext)
    const [ordersList, setOrdersList] = useState(orders)

    // useEffect(() => {
    //     if (user.userName === 'default') {
    //         router.push('/account/login')
    //     }
    // }, )

    // const addDance = () => {
    //     router.push('/account/dances/create')
    // }


    const filterPrint = (filter) => {

        const ordersCopy = [...orders]
        const newArray = ordersCopy.filter((order) => {
            return order.finishType === filter
        })
        setOrdersList(newArray)
    }

    return (
        <Layout pageTitle="Orders">
            <Alert />
            <h1>Orders</h1>
            <p>Here you can see, print, or remove any orders. Click the information about the order to view it.</p>

            <h2>Filter: </h2>

            <SmallFlexButton>
                <SmallButton text='Printed' type='button' action={() => { filterPrint('print') }}></SmallButton>
                <SmallButton text='Not Printed' type='button' action={() => { filterPrint('wait') }}></SmallButton>
                <SmallButton text='Reset' type='button' action={() => { setOrdersList(orders) }}></SmallButton>
            </SmallFlexButton>

            <h2>Sort: </h2>

            <Line></Line>

            <ShowOrders objects={ordersList} id='orders'></ShowOrders>

            <Line></Line>

            <Button text='Back' type='button' action={() => { router.push('/account') }}></Button>

        </Layout>

    )
}

export async function getStaticProps() {
    try {
        const { orders, error } = await getOrders(0)
        if (error) throw new Error(error)
        return {
            props: {
                orders: orders,
            }
        }
    } catch (error) {
        console.log('Error:' + error.message)
    }
}