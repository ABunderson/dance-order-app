import Layout from 'components/Layout'
import Breadcrumbs from 'components/Breadcrumbs'
import { useRouter } from 'next/router'
import FinalizeOutput from 'components/orders/FinalizeOutput'
import { useEffect, useState } from 'react'

export default function Finalize() {
    const [order, setOrder] = useState('')
    const [style, setStyle] = useState('')
    const router = useRouter()

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
    }, [])

    function formatOrder(order){
            order.phoneOne = `(${order.phoneOne.slice(0, 3)}) ${order.phoneOne.slice(3, 6)}-${order.phoneOne.slice(6, 10)}`
            order.phoneTwo = `(${order.phoneTwo.slice(0, 3)}) ${order.phoneTwo.slice(3, 6)}-${order.phoneTwo.slice(6, 10)}`

            let date = new Date(order.danceDate)
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            let month = months[date.getMonth()]

            order.danceDate = `${month} ${date.getDate()}`
            return(order)
    }



    return (
        <Layout pageTitle='Finalize'>
            <Breadcrumbs path={[{ 'loc': '/', 'string': 'info' }, { 'loc': '/', 'string': 'order' }, { 'loc': '/', 'string': 'styles' }]}></Breadcrumbs>
            <h1>Finalize</h1>
            <p>In any of the information below is incorrect please go back to the right page and change it.</p>
            <FinalizeOutput order={order} style={style}></FinalizeOutput>

        </Layout>
    )
}
