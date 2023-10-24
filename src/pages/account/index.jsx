import { getDances } from 'mongoDb/dances'
import { getStyles, getStylesByDefault } from 'mongoDb/styles'
import { getFlowers } from 'mongoDb/flowers'
import { getSupplies } from 'mongoDb/supplies'
import { getAddons } from 'mongoDb/addons'

import Layout from 'components/Layout'
import Line from 'components/Line'
import ShowList from 'components/account/ShowList'
import Link from 'next/link'
import Button from 'components/Button'
import { useRouter } from 'next/router'
import { Alert } from 'components/Alert'


export default function Account({ dances, styles, flowers, supplies, addons, dStyles }) {
    const router = useRouter()

    

    return (
        <Layout pageTitle="Account">

<Alert />   
            
            <h1>Welcome PLACEHOLDER</h1>
            <p>Here you can see, add, edit, or remove dances, styles, flowers, supplies, addons, and default styles. Each category only shows 10 items. To see all the items click on the category header</p>

            <Link href='/account/dances'><h2>Dances</h2></Link>
            <Button text='Add' type='button' action={() => {router.push('/account/dances/create')}}></Button>
            <ShowList objects={dances} type='dances'></ShowList>
            <Line></Line>

            <Link href='account/styles'><h2>Styles</h2></Link>
            <ShowList objects={styles}></ShowList>
            <Line></Line>

            <h2>Flowers</h2>
            <ShowList objects={flowers}></ShowList>
            <Line></Line>

            <h2>Supplies</h2>
            <ShowList objects={supplies}></ShowList>
            <Line></Line>

            <h2>Add-ons</h2>
            <ShowList objects={addons}></ShowList>
            <Line></Line>

            <h2>Default Styles</h2>
            <ShowList objects={dStyles}></ShowList>
            <Line></Line>


        </Layout>

    )
}

export async function getStaticProps() {

   let dancesReturn
    try {
        const { dances, error } = await getDances(10)
        if (error) throw new Error(error)
        dancesReturn = dances
    } catch (error) {
        console.log('Error:' + error.message)
    }  

    let stylesReturn
    try {
        const { styles, error } = await getStyles(10)
        if (error) throw new Error(error)
        stylesReturn = styles
    } catch (error) {
        console.log('Error:' + error.message)
    }  

    let flowersReturn
    try {
        const { flowers, error } = await getFlowers(10)
        if (error) throw new Error(error)
        flowersReturn = flowers
    } catch (error) {
        console.log('Error:' + error.message)
    }  

    let suppliesReturn
    try {
        const { supplies, error } = await getSupplies(10)
        if (error) throw new Error(error)
        suppliesReturn = supplies
    } catch (error) {
        console.log('Error:' + error.message)
    }  

    let addonsReturn
    try {
        const { addons, error } = await getAddons(10)
        if (error) throw new Error(error)
        addonsReturn = addons
    } catch (error) {
        console.log('Error:' + error.message)
    }  
   
    let dStylesReturn
    try {
        const { styles, error } = await getStylesByDefault(10)
        if (error) throw new Error(error)
        dStylesReturn = styles
    } catch (error) {
        console.log('Error:' + error.message)
    }  
    return {
            props: {
                dances: dancesReturn,
                styles: stylesReturn,
                flowers: flowersReturn,
                supplies: suppliesReturn,
                addons: addonsReturn,
                dStyles: dStylesReturn,
            }
        }
}