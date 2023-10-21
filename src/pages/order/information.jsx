import Layout from 'components/Layout'
import InformationForm from 'components/orders/InformationForm'
import { useRouter } from 'next/router'
import { alertService } from '../../../services/alert.service'
import {Alert} from 'components/Alert'

export default function Information() {

    const router = useRouter();

    const path = window.location.pathname
    const pathObj = [{order: 1, locName: 'Info', path: path}]
    const pathString = JSON.stringify(pathObj)

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
        convertedJSON.orderDate = new Date()
        // console.log(convertedJSON)

        let date = new Date(convertedJSON.danceDate)

        if ( date.getDay() !== 5){
            console.log(date.getDay())
            alertService.warn('Please pick a Saturday', {autoClose: false, keepAfterRouteChange: false})
            return
        }

        if ( convertedJSON.phoneOne === convertedJSON.phoneTwo){
            alertService.warn('Phone numbers cannot match', {autoClose: false, keepAfterRouteChange: false})
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
            {/* <Breadcrumbs path={pathObj}></Breadcrumbs> */}
            <h1>Personal Information</h1>

            <InformationForm action={onSubmit}></InformationForm>
            

        </Layout>
    )
}
