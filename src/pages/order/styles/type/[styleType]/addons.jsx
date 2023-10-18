// all the styles either bout or cor
import Layout from 'components/Layout'
import Breadcrumbs from 'components/Breadcrumbs'
import { useRouter } from 'next/router'
import { getAddonsByType } from 'mongoDb/addons'
import AddonForm from 'components/orders/addons/AddonForm'
import { getSupplyByName } from 'mongoDb/supplies'

export default function GetStyles({ addons, ribbon }) {
    console.log(addons)

    const router = useRouter()
    // // const styleId = router.query.productId
    if (router.isFallback) {
        return <h1>Loading:</h1>
    }

    const goBack = () => {
        // console.log('want to go back')
        router.back()
    }

    async function onSubmit(event) {
        console.log('submit')
        event.preventDefault()

        const formData = new FormData(event.target),
            convertedJSON = {};

        formData.forEach(function (value, key) {
            convertedJSON[key] = value;
        });

        console.log(convertedJSON)
        // router.push(`/order/styles/type/${style[0].type}/addons`)
    }

    return (
        <Layout pageTitle='Styles'>
            <Breadcrumbs path={[{ 'loc': '/', 'string': 'info' }, { 'loc': '/', 'string': 'order' }, { 'loc': '/', 'string': 'styles' }]}></Breadcrumbs>

            <h1 style={{ textTransform: 'capitalize' }}>Finishing Touches</h1>

            <AddonForm backAction={goBack} forwardAction={onSubmit} addons={addons} ribbon={ribbon}></AddonForm>


        </Layout>
    )
}

export async function getStaticPaths() {
    return {
        paths: [
            {
                params: { styleType: 'corsage' },
            },
            {
                params: { styleType: 'boutonniere' },
            },
        ],
        fallback: true,
    }
}

export async function getStaticProps(context) {
    const { params } = context
    try {
        const { addons, error } = await getAddonsByType(params.styleType)
        if (error) throw new Error(error)

        const { supplies, Serror } = await getSupplyByName('ribbon')
        if (Serror) throw new Error(Serror)

        return {
            props: {
                addons: addons,
                ribbon: supplies,
            }
        }
    } catch (error) {
        console.log('Error:' + error.message)
    }

}