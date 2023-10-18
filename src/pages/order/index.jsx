import Layout from 'components/Layout'
import Breadcrumbs from 'components/Breadcrumbs'
import InformationForm from 'components/orders/InformationForm'
import { useRouter } from 'next/router'

export default function Finalize() {

    const router = useRouter();
    
    console.log(window.sessionStorage.getItem('currentOrderId'))




    return (
        <Layout pageTitle='Finalize'>
            <Breadcrumbs path={[{ 'loc': '/', 'string': 'info' }, { 'loc': '/', 'string': 'order' }, { 'loc': '/', 'string': 'styles' }]}></Breadcrumbs>
            <h1>Finalize</h1>

        </Layout>
    )
}