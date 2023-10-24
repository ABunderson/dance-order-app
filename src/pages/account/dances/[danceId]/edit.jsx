import { getStyles } from 'mongoDb/styles'
import { getFlowers } from 'mongoDb/flowers'
import { getDances, getDanceById } from 'mongoDb/dances'

import { useRouter } from 'next/router'

import { alertService } from 'services/alert.service'
import { Alert } from 'components/Alert'
import Layout from 'components/Layout'
import DanceForm from 'components/account/dances/DanceForm'


export default function EditDance({ styles, flowers, dance }) {

    const router = useRouter();

    const getFlowers = () => {
        const flowers = []

        flowerTypes?.map((flower) => {

            let name = flower

            if (flower === 'babiesbreath') {
                name = 'babies breath'
            } else if (flower === 'fullrose') {
                name = 'full rose'
            }

            let returnObj
            returnObj = { flowerName: name, colors: findChecked(flower) }
            flowers.push(returnObj)
        })
        return flowers
    }

    const flowerTypes = flowers?.map((flower) => {
        return flower.name.split(" ").join('')
    })

    const findChecked = (className) => {
        const checkboxes = document.querySelectorAll(`.${className}`)
        const returnArray = []
        checkboxes.forEach((checkbox) => {

            if (checkbox.checked) {
                returnArray.push(checkbox.value)
            }
        })
        return returnArray
    }

    async function onSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.target),
            convertedJSON = {};

        formData.forEach(function (value, key) {
            convertedJSON[key] = value;
        });

        convertedJSON.editDate = new Date()

        convertedJSON.schools = convertedJSON.schools.split(',')
        convertedJSON.schools = convertedJSON.schools.map((school) => {
            return school.trim()
        })
        let date = new Date(convertedJSON.danceDate)

        convertedJSON.styles = findChecked('styles')
        convertedJSON.flowers = getFlowers()

        delete convertedJSON.rose
        delete convertedJSON.babiesbreath
        delete convertedJSON.carnation
        delete convertedJSON.daisy
        delete convertedJSON.freesia
        delete convertedJSON.ranunculus
        delete convertedJSON.succulent
        delete convertedJSON.fullrose

        if (date.getDay() !== 5) {
            alertService.warn('Please pick a Saturday', { autoClose: false, keepAfterRouteChange: false })
            return
        }



        let res = await fetch(`/api/dances/${dance[0]._id}/update`, {
            method: 'POST',
            body: JSON.stringify(convertedJSON),
        })
        res = await res.json()

        if (res.ok === 1) {
            alertService.warn('Succesfully edited dance!', { autoClose: false, keepAfterRouteChange: true })
            router.back()
        }
    }

    return (
        <Layout pageTitle='Edit Dance'>

            <Alert />
            <h1>Edit Dance</h1>

            <DanceForm action={onSubmit} styles={styles} flowers={flowers} dance={dance}></DanceForm>

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
            dance: dance,
        }
    }
}