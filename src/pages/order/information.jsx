import Layout from 'components/Layout'
import Breadcrumbs from 'components/Breadcrumbs'
import InformationForm from 'components/orders/InformationForm'
import { useRouter } from 'next/router'

export default function Information() {

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

        let res = await fetch('/api/orders', {
            method: 'POST',
            body: JSON.stringify(convertedJSON),
        })
        res = await res.json()
        // console.log(res)
        // console.log(res._id)
        window.sessionStorage.setItem('currentOrderId', res._id)


        router.push('/order/styles/type')
    }



    return (
        <Layout pageTitle='Personal Information'>
            <Breadcrumbs path={[{ 'loc': '/', 'string': 'info' }, { 'loc': '/', 'string': 'order' }, { 'loc': '/', 'string': 'styles' }]}></Breadcrumbs>
            <h1>Personal Information</h1>

            <InformationForm action={onSubmit}></InformationForm>

        </Layout>
    )
}