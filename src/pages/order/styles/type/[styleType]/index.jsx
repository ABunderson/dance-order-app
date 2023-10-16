// all the styles either bout or cor
import Layout from 'components/Layout'
import Breadcrumbs from 'components/Breadcrumbs'
import { getStylesByType } from 'mongoDb/styles'
import { useRouter } from 'next/router'
import StyleCard from 'components/orders/StyleCard'
import FlexGrid from 'components/orders/FlexGrid'

export default function GetStyles({ styles }) {

    const router = useRouter()
    // // const styleId = router.query.productId
    if (router.isFallback) {
        return <h1>Loading:</h1>
    }

    const chooseStyle = (style) => {
        // console.log(`clicked ${style.name}`)
        router.push(`/order/styles/${style._id}`)
    }

    return (
        <Layout pageTitle='Styles'>
            <Breadcrumbs path={[{ 'loc': '/', 'string': 'info' }, { 'loc': '/', 'string': 'order' }, { 'loc': '/', 'string': 'styles' }]}></Breadcrumbs>

            <h1 style={{ textTransform: 'capitalize' }}>Pick {styles[0].type} Style</h1>

            <FlexGrid>
                {styles.map((style) => {
                    return <StyleCard style={style} key={style._id} action={chooseStyle}></StyleCard>
                })}
            </FlexGrid>


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
        const { styles, error } = await getStylesByType(params.styleType)
        if (error) throw new Error(error)
        return {
            props: {
                styles: styles,
            }
        }
    } catch (error) {
        console.log('Error:' + error.message)
    }
}