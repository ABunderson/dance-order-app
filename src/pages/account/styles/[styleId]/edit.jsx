import { getSupplies } from 'mongoDb/supplies'
import { getFlowers } from 'mongoDb/flowers'
import { getStyles, getStyle } from 'mongoDb/styles'

import { useRouter } from 'next/router'
import UserContext from 'context/UserContext'
import { useContext, useEffect, useState } from 'react'

import { alertService } from 'services/alert.service'
import { Alert } from 'components/allPages/Alert'
import { scrollToTop, setAlert } from 'functions/utils'
import { findChecked } from 'functions/newDance'

import Layout from 'components/allPages/Layout'
import StyleForm from 'components/account/styles/StyleForm'
import Line from 'components/Line'



export default function CreateStyle({ supplies, flowers, style }) {

    const router = useRouter();

    const { userName, setUserName } = useContext(UserContext)
    const [file, setFile] = useState('')

    useEffect(() => {
        // if (userName === 'default') {
        //     router.push('/account/login')
        // }
        !file ? setFile(style.image) : ''
    }, [file, setFile, style])



    const handleOnChange = async (event) => {
        setFile('/no-image.jpg')

        const newPath = `.,public,uploads,tempImage.jpg`
        const response = await setImage(event.target.files[0], newPath)

        if (response.status === 201) {
            setFile(`/uploads/tempImage.jpg`)
            reloadImg(file)
        }
    }

    const setImage = async (file, path) => {
        const body = new FormData()
        body.append('file', file)

        const response = await fetch(`/api/file/${path}`, {
            method: 'POST',
            body
        })

        return response
    }

    const reloadImg = file => {
        fetch(file, { cache: 'reload', mode: 'no-cors' })
            .then(() => document.body.querySelectorAll(`img[src='${file}']`).forEach(img => (img.src = file)))
            .catch(e => console.log('error', e));
    }

    async function onSubmit(event) {
        let canContinue = []
        event.preventDefault()

        const formData = new FormData(event.target),
            convertedJSON = {};

        formData.forEach(function (value, key) {
            convertedJSON[key] = value;
        });

        canContinue.push(setAlert(!convertedJSON.defaultStyle || convertedJSON.description.length === 0 || convertedJSON.name.length === 0 || convertedJSON.flower.length === 0 || convertedJSON.pageColor.length === 0 || convertedJSON.price.length === 0 || !convertedJSON.type, 'Please fill out each field.'))
        convertedJSON.supplies = findChecked('supplies')

        canContinue.push(setAlert(convertedJSON.name.includes(','), 'The name cannot include commas.'))

        // only jpg
        canContinue.push(setAlert(convertedJSON.image.type !== 'image/jpeg', 'The image is not the right type. Please upload a jpg or jpeg file.'))

        if (canContinue.includes(false)) {
            return
        }

        // handle image path
        const end = convertedJSON.image.name.split('.')
        const path = `.,public,styles,${convertedJSON.type},${convertedJSON.name.split(' ').join('-')}.${end[end.length - 1]}`

        // save image
        const response = await setImage(convertedJSON.image, path)
        convertedJSON.image = `/styles/${convertedJSON.type}/${convertedJSON.name.split(' ').join('-')}.${end[end.length - 1]}`

        canContinue.push(setAlert(response.status !== 201, 'Something went wrong uploading the image'))

        if (canContinue.includes(false)) {
            return
        }

        try {

            let res = await fetch('/api/styles', {
                method: 'POST',
                body: JSON.stringify(convertedJSON),
            })

            res = await res.json()

            if (res._id) {
                alertService.warn('Succesfully added style!', { autoClose: false, keepAfterRouteChange: true })
                router.back()
            }
        } catch (error) {
            console.log('Error: ' + error.message)
            alertService.warn('Something went wrong with the style creation.', { autoClose: false, keepAfterRouteChange: false })
            scrollToTop()
            return
        }

    }

    return (
        <Layout pageTitle='Edit Style'>
            <Alert />

            <h1>Edit Style</h1>
            <Line></Line>

            <StyleForm action={onSubmit} supplies={supplies} flowers={flowers} style={style} handleChange={handleOnChange} image={file}></StyleForm>

        </Layout>
    )
}

export async function getStaticPaths() {
    try {
        const { styles, error } = await getStyles(0)
        if (error) throw new Error(error)
        let paths = []
        paths = styles.map((style) => {
            return {
                params: { styleId: style._id },
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

    let styleReturn
    try {
        const { styles, error } = await getStyle(params.styleId)
        if (error) throw new Error(error)
        styleReturn = styles
    } catch (error) {
        console.log('Error:' + error.message)
    }


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
            style: styleReturn,
            supplies: suppliesReturn,
            flowers: flowersReturn,
        }
    }
}