import Layout from 'components/Layout'
import Breadcrumbs from 'components/Breadcrumbs'
import { getStyle, getStyles } from 'mongoDb/styles'
import { useRouter } from 'next/router'
import StyleInfo from '../../../../../../components/orders/StyleInfo'



export default function Style({ style }) {
    // style = style[0]
    // console.log(style)
    // only use below if you want to use fallback: true,

    const router = useRouter()

    if(router.isFallback){
        return <h1>The style is loading</h1>
    }

    return (
        <Layout pageTitle='Corsage Specific'>

            <Breadcrumbs path={[{ 'loc': '/', 'string': 'info' }, { 'loc': '/', 'string': 'order' }, { 'loc': '/', 'string': 'styles' }]}></Breadcrumbs>

            <StyleInfo style={style}></StyleInfo>

        </Layout>
    )

}

export async function getStaticPaths() {
    try {
        const { styles, error } = await getStyles()
        // console.log(styles)
        if (error) throw new Error(error)
        const paths = styles.map(style => {
            return {
                params: {
                    styleType: style.type,
                    styleId: style._id,
                }
            }

        })
        return {
            paths,
            fallback: true,
        }
    } catch (error) {
        console.log('Error:' + error.message)
    }
}

export async function getStaticProps(context) {
    const { params } = context
    // console.log(`these are the ${context}`)
    // console.log(context)
    // console.log(params.styleId)
    try {
        const { styles, error } = await getStyle(params.styleId)
        console.log(styles)
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
    // const response = await fetch(`api end point${params.postId}`)
    // const data = await response.json()



    // return {
    //     props: {
    //         post: data,
    //     },
    // }
}