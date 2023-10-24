import { getStyles } from 'mongoDb/styles'
import { getDances, getDanceById } from 'mongoDb/dances'

import Layout from 'components/Layout'
import DanceView from 'components/account/dances/DanceView'
import { useRouter } from 'next/router'
import { alertService } from 'services/alert.service'
import { Alert } from 'components/Alert'
import { FlexButton} from 'components/styles/ButtonStyles'
import Button from 'components/Button'


export default function ViewDance({ styles, dance }) {
    // console.log(styles)
    // console.log(flowers)
    // console.log(dance)

    const router = useRouter();

    if(router.isFallback){
        return <h1>The style is loading</h1>
    }

    // const flowerTypes = flowers.map((flower) => {
    //     return flower.name.split(" ").join('')
    // })

    // const findChecked = (className) => {
    //     const checkboxes = document.querySelectorAll(`.${className}`)
    //     const returnArray = []
    //     checkboxes.forEach((checkbox) => {
    //         // console.log(checkbox)
    //         if (checkbox.checked) {
    //             // console.log('is checked')
    //             returnArray.push(checkbox.value)
    //         }
    //     })
    //     return returnArray
    // }

    // const getFlowers = () => {
    //     const flowers = []

    //     flowerTypes.map((flower) => {
    //         let name = flower
    //         if (flower === 'babiesbreath') {
    //             name = 'babies breath'
    //         } else if (flower === 'fullrose') {
    //             name = 'full rose'
    //         }
    //         let returnObj
    //         returnObj = { flowerName: name, colors: findChecked(flower) }
    //         flowers.push(returnObj)
    //     })

    //     return flowers
    // }

    // async function onSubmit(event) {
    //     event.preventDefault()
    //     // const ISODate = require('mongodb').ISODate
    //     // console.log('submit')

    //     const formData = new FormData(event.target),
    //         convertedJSON = {};

    //     formData.forEach(function (value, key) {
    //         convertedJSON[key] = value;
    //     });
    //     // console.log(convertedJSON)
    //     convertedJSON.editDate = new Date()

    //     convertedJSON.schools = convertedJSON.schools.split(',')
    //     convertedJSON.schools = convertedJSON.schools.map((school) => {
    //         return school.trim()
    //     })
    //     let date = new Date(convertedJSON.danceDate)



    //     convertedJSON.styles = findChecked('styles')
    //     convertedJSON.flowers = getFlowers()

    //     // deleteExtra(convertedjSON)
    //     delete convertedJSON.rose
    //     delete convertedJSON.babiesbreath
    //     delete convertedJSON.carnation
    //     delete convertedJSON.daisy
    //     delete convertedJSON.freesia
    //     delete convertedJSON.ranunculus
    //     delete convertedJSON.succulent
    //     delete convertedJSON.fullrose


    //     // console.log(convertedJSON)

    //     if (date.getDay() !== 5) {
    //         // console.log(date.getDay())
    //         alertService.warn('Please pick a Saturday', { autoClose: false, keepAfterRouteChange: false })
    //         return
    //     }


    //     let res = await fetch('/api/dances', {
    //         method: 'POST',
    //         body: JSON.stringify(convertedJSON),
    //     })

    //     res = await res.json()
    //     // console.log(res)
    //     // console.log(res._id)

    //     if (res._id) {
    //         alertService.warn('Succesfully added dance!', { autoClose: false, keepAfterRouteChange: true })
    //         router.back()
    //     }
    // }
    const onSubmit = () => {
        console.log('submit')
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
        // console.log(styles)
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

    let stylesReturn
    try {
        const { styles, error } = await getStyles(0)
        if (error) throw new Error(error)
        stylesReturn = styles
    } catch (error) {
        console.log('Error:' + error.message)
    }

    let dance
    try {
        const { dances, error } = await getDanceById(params.danceId)
        if (error) throw new Error(error)
        dance = dances
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