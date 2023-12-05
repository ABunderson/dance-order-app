import { getSupplies } from 'mongodb/supplies'
import { getFlowers } from 'mongodb/flowers'

import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'

import UserContext from 'context/UserContext'
import MessageContext from 'context/MessageContext'

import { Alert } from 'components/allPages/Alert'
import Layout from 'components/allPages/Layout'
import StyleForm from 'components/account/styles/StyleForm'
import Line from 'components/Line'

import { setWarning } from 'functions/utils'
import { findChecked } from 'functions/newDance'
import { setImage, reloadImg } from 'functions/images'

export default function CreateStyle({ supplies, flowers }) {
    const router = useRouter();

    const { userName, setUserName } = useContext(UserContext)
    const { message, setMessage } = useContext(MessageContext)

    const [file, setFile] = useState('')

    useEffect(() => {
        if (userName === 'default') {
            router.push('/account/login')
        }

        !file ? setFile('/no-image.jpg') : ''
    }, [file, setFile, userName, router])

    const handleOnChange = async (event) => {
        setFile('/no-image.jpg')

        const newPath = `.,public,uploads,tempImg.jpg`
        const response = await setImage(event.target.files[0], newPath)

        if (response.status === 201) {
            setFile(`/uploads/tempImg.jpg`)
            reloadImg(file)
        }
    }

    async function onSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.target),
            convertedJSON = {};

        formData.forEach(function (value, key) {
            convertedJSON[key] = value;
        });

        // backend validation
        if(!convertedJSON.defaultStyle || convertedJSON.description.length === 0 || convertedJSON.name.length === 0 || convertedJSON.flower.length === 0 || convertedJSON.pageColor.length === 0 || convertedJSON.price.length === 0 || !convertedJSON.type) {
            setWarning('Please fill out each field')
            return
        }

        if(convertedJSON.name.includes(',')) {
            setWarning('The name cannot include commas')
            return
        }

        if(convertedJSON.image.type !== 'image/jpeg') {
            setWarning('The image is not the right type. Please upload a jpg or jpeg file')
            return
        }

        convertedJSON.supplies = findChecked('supplies')

        // handle image path
        const end = convertedJSON.image.name.split('.')
        const path = `.,public,styles,${convertedJSON.type},${convertedJSON.name.split(' ').join('-')}.${end[end.length - 1]}`

        // save image
        const response = await setImage(convertedJSON.image, path)
        convertedJSON.image = `/styles/${convertedJSON.type}/${convertedJSON.name.split(' ').join('-')}.${end[end.length - 1]}`

        if(response.status !== 201) {
            setWarning('Something went wrong with the image upload')
            return
        }

        try {
            let res = await fetch('/api/styles', {
                method: 'POST',
                body: JSON.stringify(convertedJSON),
            })

            res = await res.json()

            if (res._id) {
                setMessage('Successfully added style')
                router.back()
            }
        } catch (error) {
            console.log('Error: ' + error.message)
            setWarning('Something went wrong when uploading the new style')
            return
        }
    }

    return (
        <Layout pageTitle='Create Style'>
            <Alert />

            <h1>Create Style</h1>
            <Line></Line>

            <StyleForm action={onSubmit} supplies={supplies} flowers={flowers} style={false} handleChange={handleOnChange} image={file}></StyleForm>

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