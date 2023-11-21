import { getSupplies } from 'mongoDb/supplies'
import { getFlowers } from 'mongoDb/flowers'

import { useRouter } from 'next/router'
import UserContext from 'context/UserContext'
import { useContext, useEffect, useState } from 'react'

import { alertService } from 'services/alert.service'
import { Alert } from 'components/allPages/Alert'
import { scrollToTop } from 'functions/utils'
import { findFlowersNeeded, checkFlowers, getSelectedFlowers, flowerTypes, findChecked } from 'functions/newDance'

import Layout from 'components/allPages/Layout'
import StyleForm from 'components/account/styles/StyleForm'
import Line from 'components/Line'



export default function CreateStyle({ supplies, flowers }) {

    const router = useRouter();

    const {userName, setUserName} = useContext(UserContext)
    const [file, setFile] = useState()

    // useEffect(() => {
    //     if (userName === 'default') {
    //         router.push('/account/login')
    //     }
    // },)

    const handleOnChange = async (event) => {
        console.log(event.target.files[0])
        setFile(event.target.files[0])
        const body = new FormData()
        body.append('file', event.target.files[0])
        const response = await fetch('/api/file', {
            method: 'POST',
            body
        })
        console.log(response)
    }

    async function onSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.target),
            convertedJSON = {};

        formData.forEach(function (value, key) {
            convertedJSON[key] = value;
        });

        // convertedJSON.editDate = new Date()

        // if (convertedJSON.schools.length === 0 || convertedJSON.danceDate.length === 0 || convertedJSON.name.length === 0) {
        //     alertService.warn('Please fill out each field.', { autoClose: false, keepAfterRouteChange: false })
        //     scrollToTop()
        //     return
        // }

        // try {

        //     const response = await fetch(`/api/dances/date/${convertedJSON.danceDate}`)
        //     const data = await response.json()
        //     if (data.dances[0]) {
        //         alertService.warn('There is already a dance created for that day.', { autoClose: false, keepAfterRouteChange: false })
        //         scrollToTop()
        //         return
        //     }

        // } catch (error) {
        //     alertService.warn('The check for other dances on the selected week failed.', { autoClose: false, keepAfterRouteChange: false })
        //     scrollToTop()
        //     return
        // }

        // convertedJSON.schools = convertedJSON.schools.split(',')
        // convertedJSON.schools = convertedJSON.schools.map((school) => {
        //     return school.trim()
        // })

        // let date = new Date(convertedJSON.danceDate)
        // date.setHours(date.getHours() + 30)

        // if (date.getDay() !== 6) {
        //     alertService.warn('Please pick a Saturday', { autoClose: false, keepAfterRouteChange: false })
        //     scrollToTop()
        //     return
        // }

        // if (convertedJSON.editDate.getTime() > date.getTime()) {
        //     alertService.warn('The dance date must be today or a future day.', { autoClose: false, keepAfterRouteChange: false })
        //     scrollToTop()
        //     return
        // }

        // convertedJSON.styles = findChecked('styles')
        // convertedJSON.flowers = getSelectedFlowers(flowerTypes(flowers))

        // const neededFlowers = findFlowersNeeded(convertedJSON.styles, styles)

        // const canContinue = checkFlowers(neededFlowers, convertedJSON.flowers)

        // if (canContinue) {

        //     delete convertedJSON.rose
        //     delete convertedJSON.babiesbreath
        //     delete convertedJSON.carnation
        //     delete convertedJSON.daisy
        //     delete convertedJSON.freesia
        //     delete convertedJSON.ranunculus
        //     delete convertedJSON.succulent
        //     delete convertedJSON.fullrose

        //     try {

        //         let res = await fetch('/api/dances', {
        //             method: 'POST',
        //             body: JSON.stringify(convertedJSON),
        //         })

        //         res = await res.json()

        //         if (res._id) {
        //             alertService.warn('Succesfully added dance!', { autoClose: false, keepAfterRouteChange: true })
        //             router.back()
        //         }
        //     } catch (error) {
        //         console.log('Error: ' + error.message)
        //         alertService.warn('Something went wrong with the dance creation.', { autoClose: false, keepAfterRouteChange: false })
        //         scrollToTop()
        //         return
        //     }
        // }
    }

    return (
        <Layout pageTitle='Create Style'>
            <Alert />

            <h1>Create Style</h1>
            <Line></Line>

            <StyleForm action={onSubmit} supplies={supplies} flowers={flowers} style={false} handleChange={handleOnChange}></StyleForm>

        </Layout>
    )
}

export async function getStaticProps() {
    let suppliesReturn
    try {
        const { supplies, error } = await getSupplies(0)
        if (error) throw new Error(error)
        suppliesReturn = supplies
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
            supplies: suppliesReturn,
            flowers: flowersReturn,
        }
    }
}