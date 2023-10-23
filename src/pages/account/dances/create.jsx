import { getStyles } from 'mongoDb/styles'
import { getFlowers } from 'mongoDb/flowers'

import Layout from 'components/Layout'
import DanceForm from 'components/account/dances/DanceForm'
import { useRouter } from 'next/router'
import { alertService } from 'services/alert.service'
import { Alert } from 'components/Alert'

export default function CreateDance({ styles, flowers}) {
    // console.log(styles)
    // console.log(flowers)

    const router = useRouter();


    async function onSubmit(event) {
        event.preventDefault()
        // const ISODate = require('mongodb').ISODate
        console.log('submit')

        const formData = new FormData(event.target),
            convertedJSON = {};

        formData.forEach(function (value, key) {
            convertedJSON[key] = value;
        });
        // console.log(convertedJSON)
        convertedJSON.editDate = new Date()
        // console.log(convertedJSON)

        let date = new Date(convertedJSON.danceDate)

        if (date.getDay() !== 5) {
            console.log(date.getDay())
            alertService.warn('Please pick a Saturday', { autoClose: false, keepAfterRouteChange: false })
            return
        }

        // console.log('past logic')

        // let res = await fetch('/api/orders', {
        //     method: 'POST',
        //     body: JSON.stringify(convertedJSON),
        // })
        // res = await res.json()
        // console.log(res)
        // console.log(res._id)
        // window.sessionStorage.setItem('currentOrderId', res._id)


        router.push('/account/dances')
    }

    return (
        <Layout pageTitle='Create Dance'>

            <Alert />
            <h1>Create Dance</h1>

            <DanceForm action={onSubmit} styles={styles} flowers={flowers}></DanceForm>

        </Layout>
    )
}
export async function getStaticProps() {
    let stylesReturn
    try {
        const { styles, error } = await getStyles(0)
        if (error) throw new Error(error)
        stylesReturn = styles
    } catch (error) {
        console.log('Error:' + error.message)
    }

    let flowersReturn
    try {
        const { flowers, error } = await getFlowers(0)
        if (error) throw new Error(error)
        flowersReturn = flowers
    } catch (error) {
        console.log('Error:' + error.message)
    }

    return {
        props: {
            styles: stylesReturn,
            flowers: flowersReturn,
        }
    }
}