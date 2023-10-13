import Layout from 'components/Layout'
import Breadcrumbs from 'components/Breadcrumbs'
import Card from 'components/Card'
import FlexRow from 'components/orders/flexRow'

export default function Information() {

    const corClick = () => {
        console.log('go to cor styles')
        // router.replace('/order/information')
    }

    const boutClick = () => {
        console.log('go to bout styles')
        // router.replace('/order/information')
    }

    return (
        <Layout pageTitle='Personal Information'>
            <Breadcrumbs path={[{ 'loc': '/', 'string': 'info' }, { 'loc': '/', 'string': 'order' }, { 'loc': '/', 'string': 'styles' }]}></Breadcrumbs>
            <h1>Boutonniere or Corsage</h1>
            <FlexRow>
                <Card
                    action={boutClick}
                    title='Boutonniere'
                    src='/styles/no-image.svg'
                    alt='A boutonniere'
                    imageTitle='Boutonniere'
                    description='A boutonniere is what a female traditionally buys for a male'>
                </Card>
                <Card
                    action={corClick}
                    title='Corsage'
                    src='/styles/no-image.svg'
                    alt='A corsage'
                    imageTitle='Corsage'
                    description='A corsage is what a male traditionally buys for a female'>

                </Card>
            </FlexRow>
        </Layout>
    )
}