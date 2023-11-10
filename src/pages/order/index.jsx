import Layout from 'components/Layout'
import Breadcrumbs from 'components/Breadcrumbs'
import { useRouter } from 'next/router'
import FinalizeOutput from 'components/orders/FinalizeOutput'
import FinalizeForm from 'components/orders/FinalizeForm'
import { Fragment, useContext, useEffect, useState } from 'react'
import OrderContext from 'context/OrderContext'
import DanceContext from 'context/DanceContext'
import PrintView from 'components/orders/finalize/PrintView'
import { Alert } from 'components/Alert'
import { alertService } from 'services/alert.service'
import { formatOrder } from 'functions/orders'


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

        async function getOrder() {
            const orderId = orderNum.orderNumber
            const response = await fetch(`/api/orders/${orderId}`)
            const data = await response.json()
            const order = data.orders[0]
            const prettyOrder = formatOrder(order)

            setOrder(prettyOrder)
            setStyle(order.style)
            // setPrintOrder(prettyOrder)
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

    const isBrowser = () => typeof window !== 'undefined'

    function scrollToTop() {
        if (!isBrowser()) return
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    async function onSubmit(event) {
        event.preventDefault()
        // console.log('submit')

        const formData = new FormData(event.target),
            convertedJSON = {};

        formData.forEach(function (value, key) {
            convertedJSON[key] = value;
        });


        if (!convertedJSON.finishType || !convertedJSON.saveFlower || !convertedJSON.pickupDay || !convertedJSON.payTime) {
            alertService.warn('Please select a choice for each question at the bottom.', { autoClose: false, keepAfterRouteChange: false })
            scrollToTop()
            return
        } else if (!convertedJSON.initials) {
            alertService.warn('employee initials are required.', { autoClose: false, keepAfterRouteChange: false })
            scrollToTop()
            return
        }

        let res = await fetch(`/api/orders/${order._id}/update`, {
            method: 'POST',
            body: JSON.stringify(convertedJSON),
        })
        res = await res.json()

        if (res.result.ok) {
            getNewOrder()
            getNewOrder().then(function() {print(convertedJSON.finishType)})
        }

        // unset context
        orderNum.setOrderNumber('default')
        dance.setDanceNumber('default')

        router.push('/')
    }

    async function getNewOrder() {
        const response = await fetch(`/api/orders/${order._id}`)
        const data = await response.json()
        const newOrder = data.orders

        setPrintOrder(newOrder[0])
    }

    const print = async (value) => {
        if (value === 'print') {
            window.print()
        }
    }

    return (
        <Fragment>
            <Layout pageTitle='Finalize'>
                <Alert />

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
