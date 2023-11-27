import { useRouter } from 'next/router'
import UserContext from 'context/UserContext'
import { useContext, useEffect, useState } from 'react'

import { alertService } from 'services/alert.service'
import { Alert } from 'components/allPages/Alert'
import { scrollToTop, setAlert } from 'functions/utils'
import { findChecked } from 'functions/newDance'
import ColorInput from "components/account/flowers/ColorInput"

import Layout from 'components/allPages/Layout'
import Line, { SmallLine } from 'components/Line'
import ColorForm from 'components/account/flowers/ColorForm'
import Button, { SmallButton } from 'components/Button'
import { FlexButton } from 'components/styles/ButtonStyles'
import { setColorObject } from 'functions/account'



export default function AddFlower() {

    const router = useRouter();

    const { userName, setUserName } = useContext(UserContext)
    const [file, setFile] = useState('/no-image.jpg')
    const [colorArray, setColorArray] = useState([])

    useEffect(() => {

        if (!router.isReady) { return }
        else {
            if (colorArray.length === 0) {
                const { query: { paths } } = router
                const colors = { paths }
                colors.paths ? setColorArray(JSON.parse(colors.paths).pathObj) : setColorArray('none')
            }
        }

        // if (userName === 'default') {
        //     router.push('/account/login')
        // }

        !file ? setFile('/no-image.jpg') : ''

    }, [file, router, setColorArray])

    const removeColor = (position) => {
        fileArray.splice(position, 1)
        setFileArray(fileArray)
        colorArray.splice(position, 1)
        setColorArray(colorArray)
    }

    const handleOnChange = async (event) => {
        // console.log(event.target.files[0].type)

        let canContinue = true

        canContinue = setAlert(event.target.files[0].type !== 'image/jpeg', 'The image is not the right type. Please upload a jpg or jpeg file.')
        if (!canContinue) {
            return
        }

        setFile('/no-image.jpg')

        const newPath = `.,public,uploads,tempImg.jpg`
        const response = await setImage(event.target.files[0], newPath)

        if (response.status === 201) {
            setFile(`/uploads/tempImg.jpg`)
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

        console.log(convertedJSON)

        canContinue.push(setAlert(!convertedJSON.colorName.length === 0 || !convertedJSON.defaultColor || file === '/no-image.jpg', 'Please fill out each field.'))
        canContinue.push(setAlert(convertedJSON.colorName.includes(','), 'The name cannot include commas.'))

        // handle image

        canContinue.push(setAlert(convertedJSON.colorImage.type !== 'image/jpeg', 'The image is not the right type. Please upload a jpg or jpeg file.'))

        if (canContinue.includes(false)) {
            return
        }


        if (file.includes('temp')) {

            const end = file.split('.')
            const path = `.,public,flowers,${colorArray[0]?.flower.split(' ').join('-')},${convertedJSON.colorName.split(' ').join('-')}.${end[end.length - 1]}`

            // save image
            // console.log(convertedJSON.image)
            const response = await setImage(convertedJSON.colorImage, path)
            const fullPath = `/styles/${colorArray[0]?.flower.split(' ').join('-')}/${convertedJSON.colorName.split(' ').join('-')}.${end[end.length - 1]}`

            let canContinue = setAlert(response.status !== 201, 'Something went wrong uploading the image')

            if (!canContinue) {
                return
            }

            convertedJSON.defaultColor = convertedJSON.defaultColor === 'true' ? true : false
            convertedJSON.colorImage = fullPath
            colorArray.push(convertedJSON)

            router.push({
                query: {
                    paths: setColorObject(colorArray)
                },
                pathname: '/account/flowers/create',
            }, '/account/flowers/create')
        }
    }

    return (
        <Layout pageTitle='Add Flower Color'>
            <Alert />

            <h1>Add {colorArray[0]?.flower} Color</h1>
            <Line></Line>

            <ColorForm
                action={onSubmit}
                flower={false}
                handleChange={handleOnChange}
                image={file}
                position={false}
                number={colorArray.length}
                removeColor={removeColor}>
            </ColorForm>

        </Layout>
    )
}