import { getStyles } from 'mongoDb/styles'
import { getFlowers } from 'mongoDb/flowers'
import { getDances, getDanceById } from 'mongoDb/dances'

import { useRouter } from 'next/router'
import UserContext from 'context/UserContext'
import { useContext, useEffect } from 'react'

import { alertService } from 'services/alert.service'
import { Alert } from 'components/allPages/Alert'
import { scrollToTop } from 'functions/utils'
import { findFlowersNeeded, checkFlowers, getSelectedFlowers, flowerTypes, findChecked } from 'functions/newDance'

import Layout from 'components/allPages/Layout'
import DanceForm from 'components/account/dances/DanceForm'


export default function EditDance({ styles, flowers, dance }) {

    const router = useRouter();

    const {userName, setUserName} = useContext(UserContext)

    useEffect(() => {
        if (userName === 'default') {
            router.push('/account/login')
        }
    },)

    async function onSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.target),
            convertedJSON = {};

        formData.forEach(function (value, key) {
            convertedJSON[key] = value;
        });

        convertedJSON.editDate = new Date()

        if (convertedJSON.schools.length === 0 || convertedJSON.danceDate.length === 0 || convertedJSON.name.length === 0) {
            alertService.warn('Please fill out each field.', { autoClose: false, keepAfterRouteChange: false })
            scrollToTop()
            return
        }

        try {
            const response = await fetch(`/api/dances/date/${convertedJSON.danceDate}`)
            const data = await response.json()

            if (data.dances[0]) {
                alertService.warn('There is already a dance created for that day.', { autoClose: false, keepAfterRouteChange: false })
                scrollToTop()
                return
            }
        } catch (error) {
            alertService.warn('The check for other dances on the selected week failed.', { autoClose: false, keepAfterRouteChange: false })
            scrollToTop()
            return
        }

        convertedJSON.schools = convertedJSON.schools.split(',')
        convertedJSON.schools = convertedJSON.schools.map((school) => {
            return school.trim()
        })

        let date = new Date(convertedJSON.danceDate)
        date.setHours(date.getHours() + 30)

        if (date.getDay() !== 6) {
            alertService.warn('Please pick a Saturday', { autoClose: false, keepAfterRouteChange: false })
            scrollToTop()
            return
        }

        if (convertedJSON.editDate.getTime() > date.getTime()) {
            alertService.warn('The dance date must be today or a future day.', { autoClose: false, keepAfterRouteChange: false })
            scrollToTop()
            return
        }

        convertedJSON.styles = findChecked('styles')
        convertedJSON.flowers = getSelectedFlowers(flowerTypes(flowers))

        const neededFlowers = findFlowersNeeded(convertedJSON.styles, styles)

        const canContinue = checkFlowers(neededFlowers, convertedJSON.flowers)

        if (canContinue) {

            delete convertedJSON.rose
            delete convertedJSON.babiesbreath
            delete convertedJSON.carnation
            delete convertedJSON.daisy
            delete convertedJSON.freesia
            delete convertedJSON.ranunculus
            delete convertedJSON.succulent
            delete convertedJSON.fullrose

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