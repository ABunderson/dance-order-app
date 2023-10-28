import { getDances } from 'mongoDb/dances'
import { getStyles } from 'mongoDb/styles'
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
import UserContext from 'components/UserContext'
import { useContext, useEffect } from 'react'



export default function Account({ dances, styles, flowers, supplies, addons }) {
    const router = useRouter()

    const user = useContext(UserContext)

    useEffect(() => {
        if (user.userName === 'default') {
            router.push('/account/login')
        }
    }, [router, user.userName])

    const logOut = () => {
        user.setUserName('default')
        router.push('/')
    }

    return (
        <Layout pageTitle="Account">

            <Alert />

            <h1>Welcome {user.userName}</h1>
            <p>Here you can see, add, edit, or remove dances, styles, flowers, supplies, addons, and default styles. Each category only shows 10 items. To see all the items click on the category header</p>
            <Button text='Log Out' type='button' action={logOut}></Button>

            <Link href='/account/dances'><h2>Dances</h2></Link>
            <p>This is where you can create different dances. A dance has the date, a name, which schools are participating, and also allows you to decide which styles and flower colors are available that week.</p>
            <Button text='Add' type='button' action={() => { router.push('/account/dances/create') }}></Button>
            <ShowList objects={dances} type='dances'></ShowList>
            <Line></Line>

            <Link href='account/styles'><h2>Styles</h2></Link>
            <p>A style is either a boutonniere or a corsage. Here you can also pick which styles are default styles which mean they show on any week where there is not a dance created.</p>
            <ShowList objects={styles}></ShowList>
            <Line></Line>

            <h2>Flowers</h2>
            <p>These are the types of flowers that the styles use. Each flower can have multiple colors.</p>
            <ShowList objects={flowers}></ShowList>
            <Line></Line>

            <h2>Supplies</h2>
            <p>Items that are included with the styles such as a bow, slap bracelet, or metal back.</p>
            <ShowList objects={supplies}></ShowList>
            <Line></Line>

            <h2>Add-ons</h2>
            <p>Extra items that can be added to the order to dress it up like jewelstems.</p>
            <ShowList objects={addons}></ShowList>
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

    return {
        props: {
            dances: dancesReturn,
            styles: stylesReturn,
            flowers: flowersReturn,
            supplies: suppliesReturn,
            addons: addonsReturn,
        }
    }
}