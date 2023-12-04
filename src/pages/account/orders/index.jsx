import { getOrders } from 'mongodb/orders'

import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'

import UserContext from 'context/UserContext'
import MessageContext from 'context/MessageContext'

import Layout from 'components/allPages/Layout'
import Line from 'components/Line'
import ShowOrders from 'components/account/orders/ShowOrders'
import Button, { SmallButton } from 'components/Button'
import { Alert } from 'components/allPages/Alert'
import { SmallFlexButton } from 'components/styles/ButtonStyles'
import PrintView from 'components/orders/finalize/PrintView'

import { alertService } from 'services/alert.service'
import { setWarning } from 'functions/utils'
import { deleteBadOrders } from 'functions/orders'

export default function AllOrders({ orders }) {
    const router = useRouter()

    const { userName, setUserName } = useContext(UserContext)
    const { message, setMessage } = useContext(MessageContext)

    const [ ordersList, setOrdersList ] = useState(orders)
    const [ printOrder, setPrintOrder ] = useState(orders[0])

    let count = 0

    useEffect(() => {
        if (userName === 'default') {
            router.push('/account/login')
        }

        deleteBadOrders()

        if (message !== 'default') {
            if (count === 0) alertService.warn(message, { autoClose: false, keepAfterRouteChange: false })
            setMessage('default')
            count += 1
        }
    },)

    const filterPrint = (filter) => {
        if (document.querySelector('#print').classList.contains('active')) document.querySelector('#print').classList.remove('active')
        if (document.querySelector('#wait').classList.contains('active')) document.querySelector('#wait').classList.remove('active')
        if (document.querySelector('#name').classList.contains('active')) document.querySelector('#name').classList.remove('active')
        if (document.querySelector('#dance').classList.contains('active')) document.querySelector('#dance').classList.remove('active')
        if (document.querySelector('#order').classList.contains('active')) document.querySelector('#order').classList.remove('active')
        document.querySelector(`#${filter}`).classList.add('active')

        const ordersCopy = [...orders]
        const newArray = ordersCopy.filter((order) => {
            return order.finishType === filter
        })
        setOrdersList(newArray)
    }

    const print = async (order) => {
        const sendObject = {}

        try {
            sendObject.finishType = 'print'

            let res = await fetch(`/api/orders/${order._id}/update`, {
                method: 'POST',
                body: JSON.stringify(sendObject),
            })
            res = await res.json()

            const response = await fetch(`/api/orders`)
            const data = await response.json()
            const newOrders = data.data

            setOrdersList(newOrders)

            if (res.ok) {
                setPrintOrder(order)
                window.print()
            }
        } catch (error) {
            console.log('Error: ' + error.message)
            setWarning('Something went wrong with the database connection')
            return
        }
    }

    const sort = async (value) => {

        if (document.querySelector('#name').classList.contains('active')) document.querySelector('#name').classList.remove('active')
        if (document.querySelector('#dance').classList.contains('active')) document.querySelector('#dance').classList.remove('active')
        if (document.querySelector('#order').classList.contains('active')) document.querySelector('#order').classList.remove('active')
        document.querySelector(`#${value}`).classList.add('active')

        const sortList = [...ordersList]
        let match = true

        switch (value) {
            case 'name':
                sortList.sort((p1, p2) => (p1.firstName > p2.firstName) ? 1 : (p1.firstName < p2.firstName) ? -1 : 0)

                sortList.map((item, index) => {
                    if (item.orderDate !== ordersList[index].orderDate) {
                        return match = false
                    }
                })

                match ? sortList.sort((p1, p2) => (p1.firstName < p2.firstName) ? 1 : (p1.firstName > p2.firstName) ? -1 : 0) : ''
                break;

            case 'dance':
                sortList.sort((p1, p2) => (p1.danceDate > p2.danceDate) ? 1 : (p1.danceDate < p2.danceDate) ? -1 : 0)

                sortList.map((item, index) => {
                    if (item.orderDate !== ordersList[index].orderDate) {
                        return match = false
                    }
                })

                match ? sortList.sort((p1, p2) => (p1.danceDate < p2.danceDate) ? 1 : (p1.danceDate > p2.danceDate) ? -1 : 0) : ''
                break;

            case 'order':
                sortList.sort((p1, p2) => (p1.orderDate > p2.orderDate) ? 1 : (p1.orderDate < p2.orderDate) ? -1 : 0)

                sortList.map((item, index) => {
                    if (item.orderDate !== ordersList[index].orderDate) {
                        return match = false
                    }
                })

                match ? sortList.sort((p1, p2) => (p1.orderDate < p2.orderDate) ? 1 : (p1.orderDate > p2.orderDate) ? -1 : 0) : ''
                break;

            default:
                break;
        }
        setOrdersList(sortList)
    }

    const reset = async (orders) => {
        setOrdersList(orders)
        if (document.querySelector('#print').classList.contains('active')) document.querySelector('#print').classList.remove('active')
        if (document.querySelector('#wait').classList.contains('active')) document.querySelector('#wait').classList.remove('active')
        if (document.querySelector('#name').classList.contains('active')) document.querySelector('#name').classList.remove('active')
        if (document.querySelector('#dance').classList.contains('active')) document.querySelector('#dance').classList.remove('active')
        if (document.querySelector('#order').classList.contains('active')) document.querySelector('#order').classList.remove('active')
    }

    return (
        <Layout pageTitle='Orders'>
            <Alert />

            <h1>Orders</h1>
            <p>Here you can see, print, or remove any orders. Click the information about the order to view it. Print status can be set to not printed when viewing orders.</p>

            <h2>Filter: </h2>

            <SmallFlexButton>
                <SmallButton text='Printed' type='button' action={() => { filterPrint('print') }} id='print'></SmallButton>
                <SmallButton text='Not Printed' type='button' action={() => { filterPrint('wait') }} id='wait'></SmallButton>
                <SmallButton text='Reset' type='button' action={() => { reset(orders) }}></SmallButton>
            </SmallFlexButton>

            <h2>Sort: </h2>

            <SmallFlexButton>
                <SmallButton text='Name' type='button' action={() => { sort('name') }} id='name'></SmallButton>
                <SmallButton text='Dance Date' type='button' action={() => { sort('dance') }} id='dance'></SmallButton>
                <SmallButton text='Order Date' type='button' action={() => { sort('order') }} id='order'></SmallButton>
                <SmallButton text='Reset' type='button' action={() => { reset(orders) }}></SmallButton>
            </SmallFlexButton>

            <Line></Line>

            <ShowOrders objects={ordersList} place='individual' printAction={print}></ShowOrders>

            <Line></Line>

            <Button text='Back' type='button' action={() => { router.push('/account') }}></Button>

            <PrintView order={printOrder} id={'printA'}></PrintView>

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