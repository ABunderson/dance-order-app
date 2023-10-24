import { getStyles } from 'mongoDb/styles'
import { getFlowers } from 'mongoDb/flowers'

import Layout from 'components/Layout'
import DanceForm from 'components/account/dances/DanceForm'
import { useRouter } from 'next/router'
import { alertService } from 'services/alert.service'
import { Alert } from 'components/Alert'

export default function CreateDance({ styles, flowers}) {
    // console.log(styles)
    // console.log(flowers)

    const router = useRouter();

    const flowerTypes = flowers.map((flower) => {
        return flower.name.split(" ").join('')
    })

    const findChecked  = (className)=> {
        const checkboxes = document.querySelectorAll(`.${className}`)
        const returnArray = []
        checkboxes.forEach((checkbox) => {
            // console.log(checkbox)
            if (checkbox.checked) {
                // console.log('is checked')
                returnArray.push(checkbox.value)
            }
        })
        return returnArray
    }

    const getFlowers = () => {
        const flowers = []

        flowerTypes.map((flower) => {
            let name = flower
            if (flower === 'babiesbreath') {
                name = 'babies breath'
            } else if (flower === 'fullrose') {
                name = 'full rose'
            }
            let returnObj
            returnObj = { flowerName: name, colors: findChecked(flower)}
            flowers.push(returnObj)
        })

        return flowers
    }

    async function onSubmit(event) {
        event.preventDefault()
        // const ISODate = require('mongodb').ISODate
        // console.log('submit')

        const formData = new FormData(event.target),
            convertedJSON = {};

        formData.forEach(function (value, key) {
            convertedJSON[key] = value;
        });
        // console.log(convertedJSON)
        convertedJSON.editDate = new Date()
        
        convertedJSON.schools = convertedJSON.schools.split(',')
        convertedJSON.schools = convertedJSON.schools.map((school) => {
            return school.trim()
        })
        let date = new Date(convertedJSON.danceDate)



        convertedJSON.styles = findChecked('styles')
        convertedJSON.flowers = getFlowers()

        // deleteExtra(convertedjSON)
        delete convertedJSON.rose
        delete convertedJSON.babiesbreath
        delete convertedJSON.carnation
        delete convertedJSON.daisy
        delete convertedJSON.freesia
        delete convertedJSON.ranunculus
        delete convertedJSON.succulent
        delete convertedJSON.fullrose
        

        // console.log(convertedJSON)

        if (date.getDay() !== 5) {
            // console.log(date.getDay())
            alertService.warn('Please pick a Saturday', { autoClose: false, keepAfterRouteChange: false })
            return
        }
   

        let res = await fetch('/api/dances', {
            method: 'POST',
            body: JSON.stringify(convertedJSON),
        })

        res = await res.json()
        // console.log(res)
        // console.log(res._id)

        if (res._id){
            alertService.warn('Succesfully added dance!', { autoClose: false, keepAfterRouteChange: true })
            router.back()
        }
    }

    return (
        <Layout pageTitle='Create Dance'>

            <Alert />
            <h1>Create Dance</h1>

            <DanceForm action={onSubmit} styles={styles} flowers={flowers}></DanceForm>

        </Layout>
    )
}
export async function getStaticProps() {
    let stylesReturn
    try {
        const { styles, error } = await getStyles(0)
        if (error) throw new Error(error)
        stylesReturn = styles
    } catch (error) {
        console.log('Error:' + error.message)
    }

    let flowersReturn
    try {
        const { flowers, error } = await getFlowers(0)
        if (error) throw new Error(error)
        flowersReturn = flowers
    } catch (error) {
        console.log('Error:' + error.message)
    }

    return {
        props: {
            styles: stylesReturn,
            flowers: flowersReturn,
        }
    }
}