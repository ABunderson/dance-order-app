import Layout from 'components/Layout'
import Breadcrumbs from 'components/Breadcrumbs'
import { useRouter } from 'next/router'
import FinalizeOutput from 'components/orders/FinalizeOutput'
import FinalizeForm from 'components/orders/FinalizeForm'
import { Fragment, useContext, useEffect, useState } from 'react'
import OrderContext from 'context/OrderContext'
import DanceContext from 'context/DanceContext'
import PrintView from 'components/orders/finalize/PrintView'

export default function Finalize() {
    const [order, setOrder] = useState('')
    const [style, setStyle] = useState('')
    const [printOrder, setPrintOrder] = useState()
    const router = useRouter()
    const orderNum = useContext(OrderContext)
    const dance = useContext(DanceContext)
    // console.log(orderNum)
    // console.log(order)

    const [breadcrumbs, setBreadcrumbs] = useState([])

    useEffect(() => {

        if (orderNum.orderNumber === 'default') {
            router.push('/')
        }

        if (!order) {
            getOrder()
        }

        if (!router.isReady) {
            return
        } else {
            const {
                query: { paths }
            } = router

            const crumbs = { paths }

            if (crumbs.paths) {
                setBreadcrumbs(JSON.parse(crumbs.paths))
            }
        }

    }, [order, router, orderNum.orderNumber])

    async function getOrder() {
        const orderId = orderNum.orderNumber
        const response = await fetch(`/api/orders/${orderId}`)
        const data = await response.json()
        const order = data.orders[0]
        const prettyOrder = formatOrder(order)

        setOrder(prettyOrder)
        setPrintOrder(prettyOrder)
        setStyle(order.style)
    }

    function formatOrder(order) {
        order.phoneOne = `(${order.phoneOne.slice(0, 3)}) ${order.phoneOne.slice(3, 6)}-${order.phoneOne.slice(6, 10)}`
        order.phoneTwo = `(${order.phoneTwo.slice(0, 3)}) ${order.phoneTwo.slice(3, 6)}-${order.phoneTwo.slice(6, 10)}`

        let dDate = new Date(order.danceDate)
        const months = ["Jan.", "Feb.", "March", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
        let month = months[dDate.getMonth()]

        let oDate = new Date(order.orderDate)
        let oMonth = months[oDate.getMonth()]

        order.formatDanceDate = `${month} ${dDate.getDate()}`
        order.formatOrderDate = `${oMonth} ${oDate.getDate()}`

        return (order)
    }

    async function onSubmit(event) {
        event.preventDefault()
        // console.log('submit')

        const formData = new FormData(event.target),
            convertedJSON = {};

        formData.forEach(function (value, key) {
            convertedJSON[key] = value;
        });

        let res = await fetch(`/api/orders/${order._id}/update`, {
            method: 'POST',
            body: JSON.stringify(convertedJSON),
        })
        res = await res.json()
 
        if (res.result.ok) {
            getOrder()
            
        }

        if (convertedJSON.finishType === 'print') {
            window.print()
        }

        // unset context
        orderNum.setOrderNumber('default')
        dance.setDanceNumber('default')

        router.push('/')
    }

    const getTotal = (style, order) => {
        let total = 0
        total += style.price
        order.addon?.map((item) => {
            item.price ? total += item.price : ''
        })
        return total
    }

    return (
        <Fragment>
            <Layout pageTitle='Finalize'>

                {breadcrumbs ? <Breadcrumbs path={breadcrumbs}></Breadcrumbs> : <></>}

                <h1>Finalize</h1>
                <h2>You are not done yet! Please follow the steps below.</h2>
                <p><b>First:</b> Check the information below to make sure it is correct. Fix anything that is wrong by going back to that page. Using the list of pages at the top of the screen.</p>
                <p><b>Second:</b> Choose your pickup day at the bottom of the page.</p>
                <p><b>Third:</b> Decide when you want to pay. You can pay now or pay when you pickup. Pickup day will be faster for you if you pay now.</p>
                <p><b>Last:</b> Talk to an employee to pay and have the order confirmed. <b>{`If the order isn't confirmed it will not be made!!!`}</b></p>

                <FinalizeOutput order={order} style={style}></FinalizeOutput>

                <FinalizeForm submitAction={onSubmit} id='finalForm'></FinalizeForm>
                
                <PrintView order={printOrder} id={'printA'}></PrintView>

            </Layout>
        </Fragment>
    )
}
