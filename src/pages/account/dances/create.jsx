import { getStyles } from 'mongoDb/styles'
import { getFlowers } from 'mongoDb/flowers'

import { useRouter } from 'next/router'
import UserContext from 'context/UserContext'
import { useContext, useEffect } from 'react'

import { alertService } from 'services/alert.service'
import { Alert } from 'components/allPages/Alert'
import { scrollToTop } from 'functions/utils'

import Layout from 'components/allPages/Layout'
import DanceForm from 'components/account/dances/DanceForm'



export default function CreateDance({ styles, flowers }) {

    const router = useRouter();

    const user = useContext(UserContext)

    useEffect(() => {
        if (user.userName === 'default') {
            router.push('/account/login')
        }
    },)

    const flowerTypes = flowers.map((flower) => {
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
            returnObj = { flowerName: name, colors: findChecked(flower) }
            flowers.push(returnObj)
        })

        return flowers
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

        try {

            let res = await fetch('/api/dances', {
                method: 'POST',
                body: JSON.stringify(convertedJSON),
            })

            res = await res.json()

            if (res._id) {
                alertService.warn('Succesfully added dance!', { autoClose: false, keepAfterRouteChange: true })
                router.back()
            }
        } catch (error) {
            console.log('Error: ' + error.message)
            alertService.warn('Something went wrong with the dance creation.', { autoClose: false, keepAfterRouteChange: false })
            scrollToTop()
            return
        }
    }

    return (
        <Layout pageTitle='Create Dance'>
            <Alert />
            
            <h1>Create Dance</h1>

            <DanceForm action={onSubmit} styles={styles} flowers={flowers} dance={false}></DanceForm>

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