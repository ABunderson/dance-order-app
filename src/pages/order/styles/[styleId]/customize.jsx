import Layout from 'components/Layout'
import Breadcrumbs from 'components/Breadcrumbs'
import { getStyle, getStyles } from 'mongoDb/styles'
import { useRouter } from 'next/router'
import { getFlowerByName } from 'mongoDb/flowers'
import { getSupplyByNameArray } from 'mongoDb/supplies'
import CustomizeForm from 'components/orders/customize/CustomizeForm'


// export default function Customize() {
//     return <h1>Customize</h1>
// }

export default function Customize({ style, flower, supplies }) {
    // style = style[0]
    // console.log(style)
    // only use below if you want to use fallback: true,
    // console.log(flower)
    // console.log(supplies)

    const router = useRouter()

    if (router.isFallback) {
        return <h1>Loading. . .</h1>
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
    }

    return (
        <Layout pageTitle={`Customize ${style[0].name} ${style[0].type}`}>

            <Breadcrumbs path={[{ 'loc': '/', 'string': 'info' }, { 'loc': '/', 'string': 'order' }, { 'loc': '/', 'string': 'styles' }]}></Breadcrumbs>

            <h1>Customize {style[0].name} {style[0].type}</h1>
            <CustomizeForm backAction={goBack} forwardAction={onSubmit} flower={flower} supplies={supplies}></CustomizeForm>


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
        // console.log(paths)

        return {
            // paths: [
            //     { params: { styleId: '651b048e36961e25c50377af'}},
            //     { params: { styleId: '651b052636961e25c50377b0'}},
            //     { params: { styleId: '651b052636961e25c50377b0'}},
            // ],
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

        // console.log(styles[0].flower)
        let flowerArray = []
        if (styles[0].flower) {
            const { flowers, error } = await getFlowerByName(styles[0].flower)
            if (error) throw new Error(error)
            if (!styles) {
                return {
                    notFound: true,
                }
            }
            // console.log(flowers)
            flowerArray = flowers
        }

        let supplyArray = []

        if (styles[0].ribbon || styles[0].metalBack || styles[0].wristlet) {
            // console.log('need to look it up')
            let searchArray = []
            styles[0].ribbon ? searchArray.push('ribbon') : ''
            styles[0].metalBack ? searchArray.push('metal back') : ''
            styles[0].wristlet && styles[0].wristlet !== 'elastic' ? searchArray.push(styles[0].wristlet) : ''
            // console.log(searchArray)

            const { supplies, error } = await getSupplyByNameArray(searchArray)
            // let jsonSupplies = json( supplies )
            if (error) throw new Error(error)
            if (!styles) {
                return {
                    notFound: true,
                }
            }
            // console.log(supplies)
            supplyArray = supplies
        }

        return {
            props: {
                style: styles,
                flower: flowerArray,
                supplies: supplyArray,
            }
        }
    } catch (error) {
        console.log('Error:' + error.message)
    }
}


function checkForflower(name) {
    if (name) { }
}