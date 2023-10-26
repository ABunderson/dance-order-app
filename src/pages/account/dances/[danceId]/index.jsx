import { getStyles } from 'mongoDb/styles'
import { getDances, getDanceById } from 'mongoDb/dances'

import { useRouter } from 'next/router'
import UserContext from 'components/UserContext'
import { useContext, useEffect } from 'react'

import Layout from 'components/Layout'
import DanceView from 'components/account/dances/DanceView'
import { Alert } from 'components/Alert'
import { FlexButton} from 'components/styles/ButtonStyles'
import Button from 'components/Button'


export default function ViewDance({ styles, dance }) {

    const router = useRouter();

    const user = useContext(UserContext)

    useEffect(() => {
        if (user.userName === 'default') {
            router.push('/account/login')
        }
    }, [])

    if(router.isFallback){
        return <h1>The style is loading</h1>
    }

    return (
        <Layout pageTitle='View Dance'>

            <Alert />
            <h1>View Dance</h1>

            <DanceView dance={dance} styles={styles}></DanceView>
            <FlexButton><Button text="Back" type="button" action={() => {router.back()}}></Button></FlexButton>

        </Layout>
    )
}

export async function getStaticPaths() {
    try {
        const { dances, error } = await getDances(0)

        if (error) throw new Error(error)
        let paths = []
        paths = dances.map((dance) => {
            return {
                params: { danceId: dance._id },
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

    let dance
    try {
        const { dances, error } = await getDanceById(params.danceId)
        if (error) throw new Error(error)
        dance = dances
    } catch (error) {
        console.log('Error:' + error.message)
    }

    let stylesReturn
    try {
        const { styles, error } = await getStyles(0)
        if (error) throw new Error(error)
        stylesReturn = styles
    } catch (error) {
        console.log('Error:' + error.message)
    }

    return {
        props: {
            styles: stylesReturn,
            dance: dance
        }
    }
}