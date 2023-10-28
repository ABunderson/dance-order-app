// all the styles either bout or cor
import Layout from 'components/Layout'
import Breadcrumbs from 'components/Breadcrumbs'
import { useRouter } from 'next/router'
import { getAddonsByType } from 'mongoDb/addons'
import AddonForm from 'components/orders/addons/AddonForm'
import { getSupplyByName } from 'mongoDb/supplies'
import { useState, useEffect, useContext } from 'react'
import OrderContext from 'context/OrderContext'

export default function GetStyles({ addons, ribbon }) {
    const [breadcrumbs, setBreadcrumbs] = useState([]) 
    const router = useRouter()
    const order = useContext(OrderContext)

    useEffect(() => {

        if(!router.isReady) {return}
        else {
        const {
            query: { paths }
        } = router
    
        const crumbs = { paths }
        // console.log(crumbs)
        let pathObj = JSON.parse(crumbs.paths)

        setBreadcrumbs(pathObj)
        }

    }, [router])

    if (router.isFallback) {
        return <h1>Loading:</h1>
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
                if (value === '0' || value === '') {
                    // console.log('eemplty')
                } else {
                    convertedJSON[key] = value;
                }
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

            const {
                query: { paths }
            } = router
        
            const crumbs = { paths }
        
            let pathString = 'empty'
            let pathObj
        
            if (crumbs && crumbs.paths !== 'empty' && typeof crumbs.paths !== 'undefined') {
                pathObj = JSON.parse(crumbs.paths)
        
                const path = window.location.pathname
                pathObj.push({ order: 6, locName: 'Finishing Touches', path: path })
        
                pathString = JSON.stringify(pathObj)
            }

            if (res.result.ok === 1) {
                router.push({
                    query: {
                        paths: pathString
                    },
                    pathname: `/order`,
                }, `/order`)
            }
        }
    }

    return (
        <Layout pageTitle='Styles'>
            <Breadcrumbs path={breadcrumbs}></Breadcrumbs>

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