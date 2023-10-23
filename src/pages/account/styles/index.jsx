
import { getStyles } from 'mongoDb/styles'

import Layout from 'components/Layout'
import Line from 'components/Line'
import ShowList from 'components/account/ShowList'
import Link from 'next/link'


export default function AllStyles({ styles }) {
    return (
        <Layout pageTitle="Styles">

            <h1>Styles</h1>
            <p>Here you can see, add, edit, or remove any styles.</p>
           <Line></Line>

            <ShowList objects={styles}></ShowList>
 


        </Layout>

    )
}

export async function getStaticProps() {

    try {
        const { styles, error } = await getStyles(0)
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