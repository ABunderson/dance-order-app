import { getDances } from 'mongoDb/dances'

import Layout from 'components/allPages/Layout'
import InformationForm from 'components/orders/InformationForm'
import { useRouter } from 'next/router'
import { alertService } from 'services/alert.service'
import { Alert } from 'components/allPages/Alert'
import { scrollToTop } from 'functions/utils'

import OrderContext from 'context/OrderContext'
import DanceContext from 'context/DanceContext'
import { useContext, useEffect } from 'react'

export default function Information({ dances }) {
    const router = useRouter()
    const order = useContext(OrderContext)
    const dance = useContext(DanceContext)

    async function onSubmit(event) {

        const path = window.location.pathname
        const pathObj = [{ order: 1, locName: 'Info', path: path }]
        const pathString = JSON.stringify(pathObj)

        event.preventDefault()

        const formData = new FormData(event.target),
            convertedJSON = {};

        formData.forEach(function (value, key) {
            convertedJSON[key] = value;
        });

        convertedJSON.orderDate = new Date()

        let date = new Date(convertedJSON.danceDate)
        date.setHours(date.getHours() + 30)

        if (convertedJSON.danceDate.length === 0 || convertedJSON.dressColor.length === 0 || convertedJSON.firstName.length === 0 || convertedJSON.lastName.length === 0 || convertedJSON.phoneOne.length === 0 || convertedJSON.phoneTwo.length === 0 || convertedJSON.school.length === 0) {
            console.log('something is empty')
            alertService.warn('Please answer every question.', { autoClose: false, keepAfterRouteChange: false })
            return
        }

        if (convertedJSON.phoneOne.length !== 10 || convertedJSON.phoneTwo.length !== 10) {
            alertService.warn('A phone number is the wrong length.', { autoClose: false, keepAfterRouteChange: false })
            return
        }

        if (date.getDay() !== 6) {
            // console.log(date.getDay())
            alertService.warn('Please pick a Saturday', { autoClose: false, keepAfterRouteChange: false })
            return
        }

        if (convertedJSON.orderDate.getTime() > date.getTime()) {
            alertService.warn('The dance date must be today or a future day.', { autoClose: false, keepAfterRouteChange: false })
            return
        }

        if (convertedJSON.phoneOne === convertedJSON.phoneTwo) {
            alertService.warn('Phone numbers cannot match', { autoClose: false, keepAfterRouteChange: false })
            return
        }

        // check for a dance
        let match = dances.filter((item) => {
            return convertedJSON.danceDate === item.danceDate
        })

        if (match.length === 1) {
            dance.setDanceNumber(match[0]._id)
        } else {
            dance.setDanceNumber('default')
        }

        try {

            let res = await fetch('/api/orders', {
                method: 'POST',
                body: JSON.stringify(convertedJSON),
            })
            res = await res.json()
            // console.log(res)
            // console.log(res._id)
            order.setOrderNumber(res._id)
        } catch (error) {
            alertService.warn('The database connection is not working.', { autoClose: false, keepAfterRouteChange: false })
            scrollToTop()
            return
        }


        router.push({
            query: {
                paths: pathString
            },
            pathname: '/order/styles/type',
        }, '/order/styles/type')
    }

    return (
        <Layout pageTitle='Personal Information'>

            <Alert />

            <h1>Personal Information</h1>

            <InformationForm action={onSubmit}></InformationForm>


        </Layout>
    )
}

export async function getStaticProps() {
    try {
        const { dances, error } = await getDances(0)
        if (error) throw new Error(error)
        return {
            props: {
                dances: dances,
            }
        }
    } catch (error) {
        console.log('Error:' + error.message)
    }
}