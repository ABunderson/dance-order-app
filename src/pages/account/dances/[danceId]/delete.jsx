import { getStyles } from 'mongoDb/styles'
import { getDances, getDanceById } from 'mongoDb/dances'

import { useRouter } from 'next/router'

import { alertService } from 'services/alert.service'
import { Alert } from 'components/Alert'

import Layout from 'components/Layout'
import DanceView from 'components/account/dances/DanceView'
import { FlexButton} from 'components/styles/ButtonStyles'
import Button from 'components/Button'
import Line from 'components/Line'


export default function DeleteDance({ styles, dance }) {

    const router = useRouter();

    if(router.isFallback){
        return <h1>The style is loading</h1>
    }

    const deleteDance = async () => {

        let res = await fetch(`/api/dances/${dance[0]._id}/delete`, {
            method: 'POST',
        })
        res = await res.json()

        if (res.ok) {
            alertService.warn('Succesfully added dance!', { autoClose: false, keepAfterRouteChange: true })
            router.back()
        }
    }



    return (
        <Layout pageTitle='Delete Dance'>

            <Alert />
            <h1>Delete Dance</h1>
            <h2>Are you sure you want to delete this dance? This action cannot be undone.</h2>
            <FlexButton><Button text='Delete' type='button' action={deleteDance}></Button><Button text="Back" type="button" action={() => {router.back()}}></Button></FlexButton>

            <Line></Line>

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