import Layout from 'components/Layout'
import Breadcrumbs from 'components/Breadcrumbs'
import { getStyle, getStyles } from 'mongoDb/styles'
import { useRouter } from 'next/router'
import StyleInfo from 'components/orders/StyleInfo'



export default function Style({ style }) {
    // // only use below if you want to use fallback: true,

    const router = useRouter()

    if(router.isFallback){
        return <h1>The style is loading</h1>
    }

    const goBack = () => {
        console.log('want to go back')
        router.back()
    }

    const pickStyle = () => {
        console.log('want this style')
    }

    return (
        <Layout pageTitle={`${style[0].name} ${style[0].type}`}>

            <Breadcrumbs path={[{ 'loc': '/', 'string': 'info' }, { 'loc': '/', 'string': 'order' }, { 'loc': '/', 'string': 'styles' }]}></Breadcrumbs>

            <StyleInfo style={style[0]} backAction={goBack} forwardAction={pickStyle}></StyleInfo>

        </Layout>
    )

}

export async function getStaticPaths() {
    try {
        const { styles, error } = await getStyles()
        // console.log(styles)
        if (error) throw new Error(error)
        let paths = []
        paths = styles.map((style) => {
            return {
                params: { styleId: style._id },
            }
        })

        return {
            paths,
            fallback: true
        }
    } catch (error) {
        console.log('Error:' + error.message)
    }
}

export async function getStaticProps(context) {
    const { params } = context

    try {
        const { styles, error } = await getStyle(params.styleId)
        if (error) throw new Error(error)
        if (!styles) {
            return {
                notFound: true,
            }
        }
        return {
            props: {
                style: styles,
            }
        }
    } catch (error) {
        console.log('Error:' + error.message)
    }
}