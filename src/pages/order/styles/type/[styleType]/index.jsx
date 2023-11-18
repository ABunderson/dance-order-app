// all the styles either bout or cor
import Layout from 'components/allPages/Layout'
import Button from 'components/Button'
import Breadcrumbs from 'components/orders/Breadcrumbs'
import { getStylesByType } from 'mongoDb/styles'
import { useRouter } from 'next/router'
import StyleCard from 'components/orders/style/StyleCard'
import { useState, useEffect, useContext } from 'react'
import DanceContext from 'context/DanceContext'
import { capitalize } from 'functions/utils'
import { setCrumbs } from 'functions/orders'
import { GridDiv } from 'components/styles/Grid'

export default function GetStyles({ styles }) {

    const router = useRouter()
    const [breadcrumbs, setBreadcrumbs] = useState([])
    const {danceNumber, setDanceNumber} = useContext(DanceContext)
    const [shownStyles, setShownStyles] = useState([])

    useEffect(() => {

        if (!router.isReady) { return }
        else {
            const { query: { paths }} = router
            const crumbs = { paths }
            crumbs.paths ? setBreadcrumbs(JSON.parse(crumbs.paths)) : setBreadcrumbs('none')
        }

        if (shownStyles.length === 0) {
            getOutputStyles()
        }

        async function getOutputStyles() {


            if (danceNumber !== 'default') {

                try {

                    const response = await fetch(`/api/dances/${danceNumber}`)
                    const data = await response.json()
                    const danceInfo = data.dances[0]

                    let danceStyles = styles.filter((item) => {
                        return danceInfo.styles.includes(item._id)
                    })

                    setShownStyles(danceStyles)
                } catch (error) {
                    alertService.warn('The styles for the dance did not load.', { autoClose: false, keepAfterRouteChange: false })
                    scrollToTop()
                    return
                }

            } else {
                let defaultStyles = styles.filter((item) => {
                    return item.defaultStyle === true
                })

                setShownStyles(defaultStyles)
            }
        }

    }, [router, danceNumber, shownStyles, styles])

    if (router.isFallback) {
        return <h1>Loading:</h1>
    }

    const chooseStyle = (style) => {
        router.push({
            query: {
                paths: setCrumbs(breadcrumbs, { order: 3, locName: styles[0].type, path: window.location.pathname })
            },
            pathname: `/order/styles/${style._id}`,
        }, `/order/styles/${style._id}`)
    }

    return (
        <Layout pageTitle={capitalize(`${styles[0].type}s`)}>
            {breadcrumbs ? <Breadcrumbs path={breadcrumbs}></Breadcrumbs> : <></>}

            <h1 style={{ textTransform: 'capitalize' }}>Pick {styles[0].type} Style</h1>

            <GridDiv>
                {shownStyles?.map((style) => {
                    return <StyleCard style={style} key={style._id} action={chooseStyle}></StyleCard>
                })}
            </GridDiv>

            <Button text='Back' type='button' action={() => { router.back() }}></Button>

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