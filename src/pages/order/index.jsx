import { useRouter } from 'next/router'

import { Fragment, useContext, useEffect, useState } from 'react'
import OrderContext from 'context/OrderContext'
import DanceContext from 'context/DanceContext'

import Layout from 'components/Layout'
import Breadcrumbs from 'components/Breadcrumbs'
import PrintView from 'components/orders/finalize/PrintView'
import FinalizeOutput from 'components/orders/finalize/FinalizeOutput'
import FinalizeForm from 'components/orders/finalize/FinalizeForm'

import { Alert } from 'components/Alert'
import { alertService } from 'services/alert.service'
import { scrollToTop } from 'functions/utils'


export default function Finalize() {
    const [order, setOrder] = useState('')
    const [style, setStyle] = useState('')
    const [printOrder, setPrintOrder] = useState()
    const router = useRouter()
    const orderNum = useContext(OrderContext)
    // const {orderNumber, setOrderNumber} = useContext(OrderContext)
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
            try {
                const orderId = orderNum.orderNumber
                const { response, error } = await fetch(`/api/orders/${orderId}`)
                if (error) throw new Error(error)
                const data = await response.json()
                const order = data.orders[0]
                setOrder(order)
                setStyle(order.style)
            } catch (error) {
                console.log('Error: ' + error.message)
                alertService.warn('The order information has been lost.', { autoClose: false, keepAfterRouteChange: false })
            }
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
        try {
            let res = await fetch(`/api/orders/${order._id}/update`, {
                method: 'POST',
                body: JSON.stringify(convertedJSON),
            })
            res = await res.json()

            if (res.result.ok) {
                getNewOrder()
                // setTimeout(() => {
                //     window.print()
                // }, 2000) 

                if (convertedJSON.finishType === 'print') {
                    getNewOrder()
                        .then(function () { print(convertedJSON.finishType) })
                        .then(function () { finish() })
                } else {
                    finish()
                }
            }
        } catch (error) { }
    }

    const finish = () => {
        // unset context
        orderNum.setOrderNumber('default')
        dance.setDanceNumber('default')
        router.push('/')
    }

    async function getNewOrder() {
        try {
        const response = await fetch(`/api/orders/${order._id}`)
        const data = await response.json()
        const newOrder = data.orders

        setPrintOrder(newOrder[0])
        
        } catch (error) {
            alertService.warn('The order could not be updated to print.', { autoClose: false, keepAfterRouteChange: false })
            scrollToTop()
            return
        }
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
