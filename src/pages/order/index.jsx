import Layout from 'components/Layout'
import Breadcrumbs from 'components/Breadcrumbs'
import { useRouter } from 'next/router'
import FinalizeOutput from 'components/orders/FinalizeOutput'
import FinalizeForm from 'components/orders/FinalizeForm'
import { Fragment, useEffect, useState } from 'react'

export default function Finalize() {
    const [order, setOrder] = useState('')
    const [style, setStyle] = useState('')
    const router = useRouter()

    const [breadcrumbs, setBreadcrumbs] = useState([])

    const {
        query: { paths }
    } = router

    const crumbs = { paths }

    let pathString = 'empty'
    let pathObj
    console.log('on page')
    console.log(crumbs)

    if (crumbs && crumbs.paths !== 'empty' && typeof crumbs.paths !== 'undefined') {
        pathObj = JSON.parse(crumbs.paths)

        const path = window.location.pathname
        pathObj.push({ order: 7, locName: 'Finalize', path: path })
        // console.log('below is pathObj')
        console.log(pathObj)

        pathString = JSON.stringify(pathObj)
    }

    useEffect(() => {
        async function getOrder() {
            const orderId = window.sessionStorage.getItem('currentOrderId')

            const response = await fetch(`/api/orders/${orderId}`)
            const data = await response.json()
            const order = data.orders[0]

            const prettyOrder = formatOrder(order)


            const styleResponse = await fetch(`/api/styles/${order.styleId}`)
            const styleData = await styleResponse.json()
            const style = styleData.styles[0]

            setOrder(prettyOrder)
            setStyle(style)
        }

        if (!order) {
            getOrder()
        }
        if(!router.isReady) {return}
        else {
        const {
            query: { paths }
        } = router
    
        const crumbs = { paths }
        console.log(crumbs)
        let pathObj = JSON.parse(crumbs.paths)

        setBreadcrumbs(pathObj)
        }
    }, [order, router])

    function formatOrder(order) {
        order.phoneOne = `(${order.phoneOne.slice(0, 3)}) ${order.phoneOne.slice(3, 6)}-${order.phoneOne.slice(6, 10)}`
        order.phoneTwo = `(${order.phoneTwo.slice(0, 3)}) ${order.phoneTwo.slice(3, 6)}-${order.phoneTwo.slice(6, 10)}`

        let date = new Date(order.danceDate)
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let month = months[date.getMonth()]

        order.danceDate = `${month} ${date.getDate()}`
        return (order)
    }

    async function onSubmit(event) {
        event.preventDefault()
        console.log('submit')

        const formData = new FormData(event.target),
            convertedJSON = {};

        formData.forEach(function (value, key) {
            convertedJSON[key] = value;
        });
        console.log(convertedJSON)

        if (convertedJSON.finishType === 'print'){
            print()
        }
        router.push('/')
        // emailSomething()
        // if(email) {
        //     const recipient = 'practicedpuzzler@gmail.com'
        //     const subject = 'Test'
        //     const body = 'body of the email'
        //     const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        // }
        // print()
        // convertedJSON.password = await hashPassword(convertedJSON.password)

        // Login(convertedJSON)

        // event.target.reset()
    }

    return (
        <Fragment>
            <style jsx>
                {`
                    @media print {
                        body * {display: hidden;}
                    }
                    body {
                        background-color: red;
                    }
                `}
            </style>
            <Layout pageTitle='Finalize'>

            <Breadcrumbs path={breadcrumbs}></Breadcrumbs>
                <h1>Finalize</h1>
                <h2>You are not done yet! Please follow the steps below.</h2>
                <p><b>First:</b> Check the information below to make sure it is correct. Fix anything that is wrong by going back to that page</p>
                <p><b>Second:</b> Choose your pickup day at the bottom of the page.</p>
                <p><b>Last:</b> Talk to an employee to pay and have the order confirmed. <b>{`If the order isn't confirmed it will not be made!`}</b></p>

                <FinalizeOutput order={order} style={style}></FinalizeOutput>

                <FinalizeForm submitAction={onSubmit}></FinalizeForm>

            </Layout>
        </Fragment>
    )
}
