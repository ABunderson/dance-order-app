
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
import FlowerForm from 'components/account/flowers/FlowerForm'
import Button, { SmallButton } from 'components/Button'
import { FlexButton } from 'components/styles/ButtonStyles'
import { setColorObject } from 'functions/account'



export default function AddFlower() {

    const router = useRouter();

    const { userName, setUserName } = useContext(UserContext)
    const [fileObj, setFileObj] = useState()
    const [file, setFile] = useState('/no-image.jpg')
    const [colorArray, setColorArray] = useState([])


    useEffect(() => {
        // if (userName === 'default') {
        //     router.push('/account/login')
        // }

        !file ? setFile('/no-image.jpg') : ''

        if (!router.isReady) { return }
        else {
            let tempColors = {}
            const { query: { paths } } = router
            const colors = { paths }
            colors.paths ? tempColors = JSON.parse(colors.paths) : ''
            colorArray.length === 0  && tempColors.pathObj.length > 0 ? setColorArray(tempColors.pathObj) : ''
            console.log(colorArray)
        }

        // if (colorArray.length === 0) {
        //     setColorArray([<ColorInput image={file} position={colorArray.length} removeColor={removeColor} handleChange={handleOnChange}></ColorInput>])
        // } 
    }, [setColorArray, file])

    const addColor = async () => {
        if (setAlert(!document.querySelector('#name').value, 'A flower name needs to be uploaded. If you change this after you add colors there will be problems.')) {
            console.log('is good')

            // need to check for directory and create if doesn't exist
            try {
                let bodyObj = { url: `public/flowers/${document.querySelector('#name').value}` }
                const response = await fetch(`/api/makeDir`, {
                    method: 'POST',
                    body: JSON.stringify(bodyObj)
                })
                console.log(response)
            } catch (error) {
                console.log('Error -> ' + error)
            }

            // make sure first color is filled and then add to colorArray
            if (setAlert(!document.querySelector('#colorName').value || !document.querySelector('input[name="defaultColor"]:checked') || file === '/no-image.jpg', 'The first color needs to be filled out before moving to other colors.')) {
                if (file.includes('temp')) {
                    console.log("need to set image")
                    const end = file.split('.')
                    const path = `.,public,flowers,${document.querySelector('#name').value.split(' ').join('-')},${document.querySelector('#colorName').value.split(' ').join('-')}.${end[end.length - 1]}`

                    // save image
                    const response = await setImage(fileObj, path)
                    const fullPath = `/styles/${document.querySelector('#name').value.split(' ').join('-')}/${document.querySelector('#colorName').value.split(' ').join('-')}.${end[end.length - 1]}`

                    let canContinue = setAlert(response.status !== 201, 'Something went wrong uploading the image')

                    if (!canContinue) {
                        return
                    }

                    let firstColor = { colorName: document.querySelector('#colorName').value, defaultColor: document.querySelector('input[name="defaultColor"]:checked').value, colorImage: fullPath }
                    let tempArray = [{ flower: document.querySelector('#name').value }, firstColor]

                    router.push({
                        query: {
                            paths: setColorObject(tempArray)
                        },
                        pathname: '/account/flowers/create/color',
                    }, '/account/flowers/create/color')  

                }
            }
        }
        // router.push('/account/flowers/create/color')
        // if (colorArray.length === 0) {
        //     // setColorArray([<ColorInput image={fileArray[colorArray.length]} position={colorArray.length} removeColor={removeColor} handleChange={handleOnChange}></ColorInput>])
        // } else {
        //     // setColorArray(colorArray => ([...colorArray, <ColorInput image={fileArray[colorArray.length]} position={colorArray.length} removeColor={removeColor} handleChange={handleOnChange}></ColorInput>]))
        // }
    }

    const removeColor = (position) => {
        fileArray.splice(position, 1)
        setFileArray(fileArray)
        colorArray.splice(position, 1)
        setColorArray(colorArray)
    }

    const handleOnChange = async (event) => {
        setFile('/no-image.jpg')
        setFileObj(event.target.files[0])

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
                image={file}
                colorArray={colorArray}
                addColor={addColor}
                removeColor={removeColor}>
            </FlowerForm>

        </Layout>
    )
}