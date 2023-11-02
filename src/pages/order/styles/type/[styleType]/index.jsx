// all the styles either bout or cor
import Layout from 'components/Layout'
import Button from 'components/Button'
import Breadcrumbs from 'components/Breadcrumbs'
import { getStylesByType } from 'mongoDb/styles'
import { useRouter } from 'next/router'
import StyleCard from 'components/orders/StyleCard'
import FlexGrid from 'components/orders/FlexGrid'
import { useState, useEffect, useContext } from 'react'
import DanceContext from 'context/DanceContext'
import { capitalize } from 'functions/utils'

export default function GetStyles({ styles }) {

    const router = useRouter()
    const [breadcrumbs, setBreadcrumbs] = useState([])
    const dance = useContext(DanceContext)
    const [shownStyles, setShownStyles] = useState([])

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

        if(shownStyles.length === 0){
            getOutputStyles()
        }

        async function getOutputStyles() {
            

            if (dance.danceNumber !== 'default'){
    
                const response = await fetch(`/api/dances/${dance.danceNumber}`)
                const data = await response.json()
                const danceInfo= data.dances[0]
    
                let danceStyles = styles.filter((item) => {
                    return danceInfo.styles.includes(item._id)
                })

                setShownStyles(danceStyles)
                
            } else {
                let defaultStyles = styles.filter((item) => {
                    return item.defaultStyle === true
                })
            
                setShownStyles(defaultStyles)
            }
        }

    }, [router, dance, shownStyles, styles])

    if (router.isFallback) {
        return <h1>Loading:</h1>
    }

    const {
        query: { paths }
    } = router

    const crumbs = { paths }

    let pathString = 'empty'
    let pathObj

    if (crumbs && crumbs.paths !== 'empty' && typeof crumbs.paths !== 'undefined') {
        pathObj = JSON.parse(crumbs.paths)

        const path = window.location.pathname
        pathObj.push({ order: 3, locName: styles[0].type, path: path })

        pathString = JSON.stringify(pathObj)
    }

    const chooseStyle = (style) => {
        router.push({
            query: {
                paths: pathString
            },
            pathname: `/order/styles/${style._id}`,
        }, `/order/styles/${style._id}`)
    }

    return (
        <Layout pageTitle={capitalize(`${styles[0].type}s`)}>
            <Breadcrumbs path={breadcrumbs}></Breadcrumbs>

            <h1 style={{ textTransform: 'capitalize' }}>Pick {styles[0].type} Style</h1>

            <FlexGrid>
                {shownStyles?.map((style) => {
                    return <StyleCard style={style} key={style._id} action={chooseStyle}></StyleCard>
                })}
            </FlexGrid>

            <Button text='Back' type='button' action={()=> {router.back()}}></Button>

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