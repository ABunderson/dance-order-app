import { getDances } from 'mongodb/dances'
import { getStyles } from 'mongodb/styles'
import { getFlowers } from 'mongodb/flowers'
import { getSupplies } from 'mongodb/supplies'
import { getAddons } from 'mongodb/addons'
import { getOrders } from 'mongodb/orders'

import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import UserContext from 'context/UserContext'
import MessageContext from 'context/MessageContext'

import Layout from 'components/allPages/Layout'
import { Alert } from 'components/allPages/Alert'
import Line from 'components/Line'
import Button, { SmallButton } from 'components/Button'
import ShowList from 'components/account/ShowList'
import ShowOrder from 'components/account/orders/ShowOrders'
import PrintView from 'components/orders/finalize/PrintView'
import { FlexButton } from 'components/styles/ButtonStyles'

import { deleteBadOrders } from 'functions/orders'
import { setWarning } from 'functions/utils'

export default function Account({ dances, styles, flowers, supplies, addons, orders }) {
    const router = useRouter()

    const { userName, setUserName } = useContext(UserContext)
    const { message, setMessage } = useContext(MessageContext)

    const [printOrder, setPrintOrder] = useState(orders[0])
    const [ordersList, setOrdersList] = useState(orders)

    let count = 0

    useEffect(() => {
        // if you click on the account button when not logged in it goes to the login page
        if (userName === 'default' && message !== 'Successfully logged out.') {
            router.push('/account/login')
        }

        if (message !== 'default') {
            if (count === 0) setWarning(message)
            setMessage('default')
            count += 1
        }

        deleteBadOrders()
    }, [router, userName, message])

    const logOut = () => {
        setMessage('Successfully logged out.')
        setUserName('default')
        router.push('/')
    }

    const print = async (order) => {
        const sendObject = {}
        sendObject.finishType = 'print'

        try {
            let res = await fetch(`/api/orders/${order._id}/update`, {
                method: 'POST',
                body: JSON.stringify(sendObject),
            })
            res = await res.json()

            const response = await fetch(`/api/orders`)
            const data = await response.json()
            const newOrders = data.data
            newOrders.splice(5)

            setOrdersList(newOrders)

            if (res.ok) {
                getPrintOrder(order._id)
                getPrintOrder(order._id).then(function () {
                    window.print()
                })
            }
        } catch (error) {
            console.log('Error: ' + error.message)
            setWarning('Something went wrong with the database connection')
            return
        }
    }

    const getPrintOrder = async (id) => {
        try {
            const response = await fetch(`/api/orders/${id}`)
            const data = await response.json()
            const order = data.orders[0]

            if (order._id) {
                setPrintOrder(order)
            }
        } catch (error) {
            console.log('Error: ' + error.message)
            setWarning('Something went wrong retrieving the order from the database')
            return
        }
    }

    return (
        <Layout pageTitle="Account">

            <Alert />

            <h1>Welcome {userName}</h1>
            <p>Here you can see, add, edit, or remove dances, styles, flowers, supplies, addons, and default styles. Each category only shows five items.</p>
            <Button text='Log Out' type='button' action={logOut}></Button>
            <FlexButton>
                <SmallButton text='Change Username' type='button' action={() => { router.push('/account/changeUsername') }}></SmallButton>
                <SmallButton text='Change Password' type='button' action={() => { router.push('/account/changePassword') }}></SmallButton>
            </FlexButton>

            <Line></Line>

            <FlexButton>
                <Link href='/account/orders'><h2>Orders</h2></Link>
                <Button text='See All' type='button' action={() => { router.push('/account/orders') }}></Button>
            </FlexButton>
            <p>See orders that have been placed. This is where you can print orders that were not printed right after being taken.</p>
            <ShowOrder objects={ordersList} place={'main'} printAction={print}></ShowOrder>
            <PrintView order={printOrder} id={'printA'}></PrintView>
            <Line></Line>

            <FlexButton>
                <Link href='/account/dances'><h2>Dances</h2></Link>
                <Button text='See All' type='button' action={() => { router.push('/account/dances') }}></Button>
            </FlexButton>
            <p>This is where you can create different dances. A dance has the date, a name, which schools are participating, and also allows you to decide which styles and flower colors are available that week.</p>
            <Button text='Add' type='button' action={() => { router.push('/account/dances/create') }}></Button>
            <ShowList objects={dances} type='dances' place='main'></ShowList>
            <Line></Line>

            <FlexButton>
                <Link href='account/styles'><h2>Styles</h2></Link>
                <Button text='See All' type='button' action={() => { router.push('/account/styles') }}></Button>
            </FlexButton>
            <p>A style is either a boutonniere or a corsage. Here you can also pick which styles are default styles which mean they show on any week where there is not a dance created.</p>
            <Button text='Create' type='button' action={() => { router.push('/account/styles/create') }}></Button>
            <ShowList objects={styles} type='styles' place='main'></ShowList>
            <Line></Line>

            <FlexButton>
                <Link href='account/flowers'><h2>Flowers</h2></Link>
                <Button text='See All' type='button' action={() => { router.push('/account/flowers') }}></Button>
            </FlexButton>
            <p>These are the types of flowers that the styles use. Each flower can have multiple colors.</p>
            <Button text='Add' type='button' action={() => { router.push('/account/flowers/create') }}></Button>
            <ShowList objects={flowers} place='main'></ShowList>
            <Line></Line>

            <h2>Supplies</h2>
            <p>Items that are included with the styles such as a bow, slap bracelet, or metal back.</p>
            <ShowList objects={supplies} place='main'></ShowList>
            <Line></Line>

            <h2>Add-ons</h2>
            <p>Extra items that can be added to the order to dress it up like jewelstems.</p>
            <ShowList objects={addons} place='main'></ShowList>
            <Line></Line>

        </Layout>
    )
}

export async function getStaticProps() {

    let dancesReturn
    try {
        const { dances, error } = await getDances(5)
        if (error) throw new Error(error)
        dancesReturn = dances
    } catch (error) {
        console.log('Error:' + error.message)
        return
    }

    let ordersReturn
    try {
        const { orders, error } = await getOrders(5)
        if (error) throw new Error(error)
        ordersReturn = orders
    } catch (error) {
        console.log('Error:' + error.message)
        return
    }

    let stylesReturn
    try {
        const { styles, error } = await getStyles(5)
        if (error) throw new Error(error)
        stylesReturn = styles
    } catch (error) {
        console.log('Error:' + error.message)
        return
    }

    let flowersReturn
    try {
        const { flowers, error } = await getFlowers(5)
        if (error) throw new Error(error)
        flowersReturn = flowers
    } catch (error) {
        console.log('Error:' + error.message)
        return
    }

    let suppliesReturn
    try {
        const { supplies, error } = await getSupplies(5)
        if (error) throw new Error(error)
        suppliesReturn = supplies
    } catch (error) {
        console.log('Error:' + error.message)
        return
    }

    let addonsReturn
    try {
        const { addons, error } = await getAddons(5)
        if (error) throw new Error(error)
        addonsReturn = addons
    } catch (error) {
        console.log('Error:' + error.message)
        return
    }

    return {
        props: {
            dances: dancesReturn,
            styles: stylesReturn,
            flowers: flowersReturn,
            supplies: suppliesReturn,
            addons: addonsReturn,
            orders: ordersReturn,
        }
    }
}