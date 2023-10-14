import Layout from 'components/Layout'
import Breadcrumbs from 'components/Breadcrumbs'
import InformationForm from 'components/orders/InformationForm'
import { useRouter } from 'next/router'

export default function Information() {

    const router = useRouter();

    async function onSubmit(event) {
        event.preventDefault()

        console.log('submit')

        // need validation for form and to get form and then to send form and get back the id if the new object

        router.push('/order/type')
    }



    return (
        <Layout pageTitle='Personal Information'>
            <Breadcrumbs path={[{'loc': '/', 'string': 'info'}, {'loc': '/', 'string': 'order'}, {'loc': '/', 'string': 'styles'}]}></Breadcrumbs>
            <h1>Personal Information</h1>

            <InformationForm action={onSubmit}></InformationForm>

        </Layout>
    )
}