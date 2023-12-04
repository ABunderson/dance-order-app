import { getStyles } from 'mongodb/styles'
import { getFlowers } from 'mongodb/flowers'

import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'

import UserContext from 'context/UserContext'
import MessageContext from 'context/MessageContext'

import { Alert } from 'components/allPages/Alert'
import Layout from 'components/allPages/Layout'
import DanceForm from 'components/account/dances/DanceForm'

import { setWarning } from 'functions/utils'
import { findFlowersNeeded, checkFlowers, getSelectedFlowers, flowerTypes, findChecked } from 'functions/newDance'

export default function CreateDance({ styles, flowers }) {
    const router = useRouter();

    const { userName, setUserName } = useContext(UserContext)
    const { message, setMessage } = useContext(MessageContext)

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
            setWarning('Please fill out each field')
            return
        }

        try {

            const response = await fetch(`/api/dances/date/${convertedJSON.danceDate}`)
            const data = await response.json()

            if (data.dances[0]) {
                setWarning('There is already a dance created for that day')
                return
            }

        } catch (error) {
            setWarning('The check for other dances on the selected week failed')
            return
        }

        convertedJSON.schools = convertedJSON.schools.split(',')
        convertedJSON.schools = convertedJSON.schools.map((school) => {
            return school.trim()
        })

        let date = new Date(convertedJSON.danceDate)
        date.setHours(date.getHours() + 30)

        if (date.getDay() !== 6) {
            setWarning('Please pick a Saturday')
            return
        }

        if (convertedJSON.editDate.getTime() > date.getTime()) {
            setWarning('The dance date must be today or a future day')
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
                    setMessage('Successfully added dance')
                    router.back()
                }
            } catch (error) {
                console.log('Error: ' + error.message)
                setWarning('Something went wrong with the dance creation')
                return
            }
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
        return
    }

    let flowersReturn
    try {
        const { flowers, error } = await getFlowers(0)
        if (error) throw new Error(error)
        flowersReturn = flowers
    } catch (error) {
        console.log('Error:' + error.message)
        return
    }

    return {
        props: {
            styles: stylesReturn,
            flowers: flowersReturn,
        }
    }
}