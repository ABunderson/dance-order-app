import { getDances } from 'mongodb/dances'

import { useRouter } from 'next/router'
import { useContext} from 'react'

import OrderContext from 'context/OrderContext'
import DanceContext from 'context/DanceContext'

import Layout from 'components/allPages/Layout'
import InformationForm from 'components/orders/InformationForm'
import { Alert } from 'components/allPages/Alert'

import { setWarning } from 'functions/utils'

export default function Information({ dances }) {
    const router = useRouter()
    
    const { orderNumber, setOrderNumber } = useContext(OrderContext)
    const { danceNumber, setDanceNumber } = useContext(DanceContext)

    async function onSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.target),
            convertedJSON = {};

        formData.forEach(function (value, key) {
            convertedJSON[key] = value;
        });

        convertedJSON.orderDate = new Date()

        // converting to a date picked a different day so hours were added to fix it
        let date = new Date(convertedJSON.danceDate)
        date.setHours(date.getHours() + 20)

        // backend validation
        if (convertedJSON.danceDate.length === 0 || convertedJSON.dressColor.length === 0 || convertedJSON.firstName.length === 0 || convertedJSON.lastName.length === 0 || convertedJSON.phoneOne.length === 0 || convertedJSON.phoneTwo.length === 0 || convertedJSON.school.length === 0) {
            setWarning('All fields are required')
            return
        }

        if (convertedJSON.phoneOne.length !== 10 || convertedJSON.phoneTwo.length !== 10) {
            setWarning('A phone number is the wrong length')
            return
        }

        if (date.getDay() !== 6) {
            setWarning('Please pick a Saturday')
            return
        }

        if (convertedJSON.orderDate.getTime() > date.getTime()) {
            setWarning('The dance date must be today or a future day')
            return
        }

        if (convertedJSON.phoneOne === convertedJSON.phoneTwo) {
            setWarning('Phone numbers cannot match')
            return
        }

        // check for a dance
        let match = dances.filter((item) => {
            return convertedJSON.danceDate === item.danceDate
        })

        if (match.length === 1) {
            setDanceNumber(match[0]._id)
        } else {
            setDanceNumber('default')
        }

        try {
            let res = await fetch('/api/orders', {
                method: 'POST',
                body: JSON.stringify(convertedJSON),
            })

            res = await res.json()
            setOrderNumber(res._id)

        } catch (error) {
            setWarning('The database connection is not working')
            return
        }

        // breadcrumbs

        const pathObj = [{ order: 1, locName: 'Info', path: window.location.pathname }]
        const pathString = JSON.stringify(pathObj)

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
            <p>All fields are required.</p>

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