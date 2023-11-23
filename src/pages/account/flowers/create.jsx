import { useRouter } from 'next/router'
import UserContext from 'context/UserContext'
import { useContext, useEffect, useState } from 'react'

import { alertService } from 'services/alert.service'
import { Alert } from 'components/allPages/Alert'
import { scrollToTop, setAlert } from 'functions/utils'
import { findChecked } from 'functions/newDance'

import Layout from 'components/allPages/Layout'
import Line from 'components/Line'
import FlowerForm from 'components/account/flowers/FlowerForm'



export default function CreateStyle() {

    const router = useRouter();

    const { userName, setUserName } = useContext(UserContext)
    const [fileArray, setFileArray] = useState([])
    const [colorArray, setColorArray] = useState([])

    useEffect(() => {
        // if (userName === 'default') {
        //     router.push('/account/login')
        // }
        fileArray.length === 0 ? fileArray.push('/no-image.jpg') : ''
    }, [fileArray])



    const handleOnChange = async (event) => {
        console.log('image changed')
        // setFile('/no-image.jpg')

        // const newPath = `.,public,uploads,tempImg.jpg`
        // // const newPath = `./public/uploads/tempImage.jpg`
        // const response = await setImage(event.target.files[0], newPath)

        // if (response.status === 201) {
        //     setFile(`/uploads/tempImage.jpg`)
        //     reloadImg(file)
        // }
    }

    const setImage = async (file, path) => {
        const body = new FormData()
        body.append('file', file)
        const response = await fetch(`/api/file/${path}`, {
            method: 'POST',
            body
        })
        // console.log(response)

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

        // // convertedJSON.editDate = new Date()
        // canContinue.push(setAlert(!convertedJSON.defaultStyle || convertedJSON.description.length === 0 || convertedJSON.name.length === 0 || convertedJSON.flower.length === 0 || convertedJSON.pageColor.length === 0 || convertedJSON.price.length === 0 || !convertedJSON.type, 'Please fill out each field.'))
        // convertedJSON.supplies = findChecked('supplies')

        // canContinue.push(setAlert(convertedJSON.name.includes(','), 'The name cannot include commas.'))

        // // only jpg
        // canContinue.push(setAlert(convertedJSON.image.type !== 'image/jpeg', 'The image is not the right type. Please upload a jpg or jpeg file.'))

        // if (canContinue.includes(false)) {
        //     return
        // }


        // // handle image path
        // const end = convertedJSON.image.name.split('.')
        // const path = `.,public,styles,${convertedJSON.type},${convertedJSON.name.split(' ').join('-')}.${end[end.length - 1]}`

        // // save image
        // const response = await setImage(convertedJSON.image, path)
        // convertedJSON.image = `/styles/${convertedJSON.type}/${convertedJSON.name.split(' ').join('-')}.${end[end.length - 1]}`

        // canContinue.push(setAlert(response.status !== 201, 'Something went wrong uploading the image'))

        // if (canContinue.includes(false)) {
        //     return
        // }

        // try {

        //     let res = await fetch('/api/styles', {
        //         method: 'POST',
        //         body: JSON.stringify(convertedJSON),
        //     })

        //     res = await res.json()

        //     if (res._id) {
        //         alertService.warn('Succesfully added style!', { autoClose: false, keepAfterRouteChange: true })
        //         router.back()
        //     }
        // } catch (error) {
        //     console.log('Error: ' + error.message)
        //     alertService.warn('Something went wrong with the style creation.', { autoClose: false, keepAfterRouteChange: false })
        //     scrollToTop()
        //     return
        // }

    }

    return (
        <Layout pageTitle='Add Flower'>
            <Alert />

            <h1>Add Flower</h1>
            <Line></Line>

            <FlowerForm action={onSubmit}
                flower={false}
                handleChange={handleOnChange}
                imageArray={fileArray}
                setImageArray={setFileArray}
                colorArray={colorArray}
                setColorArray={setColorArray}>

            </FlowerForm>

        </Layout>
    )
}