import Layout from 'components/Layout'
import Breadcrumbs from 'components/Breadcrumbs'
import { getStyle, getStyles } from 'mongoDb/styles'
import { useRouter } from 'next/router'
import { getFlowerByName } from 'mongoDb/flowers'
import { getSupplyByNameArray } from 'mongoDb/supplies'
import CustomizeForm from 'components/orders/customize/CustomizeForm'
import OrderContext from 'context/OrderContext'
import DanceContext from 'context/DanceContext'
import { useState, useEffect, useContext } from 'react'



export default function Customize({ style, flower, supplies }) {
    const [breadcrumbs, setBreadcrumbs] = useState([])
    const [danceColors, setDanceColors] = useState([])

    const router = useRouter()
    const order = useContext(OrderContext)
    const dance = useContext(DanceContext)

    useEffect(() => {

        if (!router.isReady) return
        else {
            const {
                query: { paths }
            } = router

            const crumbs = { paths }
            // console.log(crumbs)
            let pathObj = JSON.parse(crumbs.paths)

            setBreadcrumbs(pathObj)
        }

        if (danceColors.length === 0 && dance.danceNumber !== 'default') {
            getOutputColors()
        }

        async function getOutputColors() {

            const response = await fetch(`/api/dances/${dance.danceNumber}`)
            const data = await response.json()
            const danceInfo = data.dances[0]

            let flowerInfo = danceInfo.flowers.filter((item) => {
                return item.flowerName === flower[0].name
            })

            setDanceColors(flowerInfo)
        }

    }, [router, dance.danceNumber, danceColors.length, flower])


    if (router.isFallback) {
        return <h1>Loading. . .</h1>
    }

    const goBack = () => {
        // console.log('want to go back')
        router.back()
    }

    async function onSubmit(event) {
        // console.log('submit')
        event.preventDefault()

        if (typeof window !== undefined) {
            const formData = new FormData(event.target),
                convertedJSON = {};

            formData.forEach(function (value, key) {
                convertedJSON[key] = value;
            });
            // console.log(convertedJSON)
            const orderId = order.orderNumber


            let res = await fetch(`/api/orders/${orderId}/update`, {
                method: 'POST',
                body: JSON.stringify(convertedJSON),
            })
            res = await res.json()
            // console.log(res.result.ok)
            // console.log(res._id)
            if (res.result.ok === 1) {

                const {
                    query: { paths }
                } = router

                const crumbs = { paths }

                let pathString = 'empty'
                let pathObj
                // console.log('on page')
                // console.log(crumbs)

                if (crumbs && crumbs.paths !== 'empty' && typeof crumbs.paths !== 'undefined') {
                    pathObj = JSON.parse(crumbs.paths)

                    const path = window.location.pathname
                    pathObj.push({ order: 5, locName: 'Customize', path: path })
                    // console.log('below is pathObj')
                    // console.log(pathObj)

                    pathString = JSON.stringify(pathObj)
                }

                router.push({
                    query: {
                        paths: pathString
                    },
                    pathname: `/order/styles/type/${style[0].type}/addons`,
                }, `/order/styles/type/${style[0].type}/addons`)
            }
        }

    }

    return (
        <Layout pageTitle={`Customize ${style[0].name} ${style[0].type}`}>

            <Breadcrumbs path={breadcrumbs}></Breadcrumbs>

            <h1 style={{ textTransform: 'capitalize' }}>Customize {style[0].name} {style[0].type}</h1>
            <CustomizeForm backAction={goBack} forwardAction={onSubmit} flower={flower} flowerColors={danceColors} supplies={supplies} styleId={style[0]._id}></CustomizeForm>


        </Layout>
    )

}

export async function getStaticPaths() {
    try {
        const { styles, error } = await getStyles(0)
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