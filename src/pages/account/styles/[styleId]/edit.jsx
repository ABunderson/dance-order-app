import { getSupplies } from 'mongodb/supplies'
import { getFlowers } from 'mongodb/flowers'
import { getStyles, getStyle } from 'mongodb/styles'

import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'

import UserContext from 'context/UserContext'
import MessageContext from 'context/MessageContext'

import { Alert } from 'components/allPages/Alert'
import Layout from 'components/allPages/Layout'
import StyleForm from 'components/account/styles/StyleForm'
import Line from 'components/Line'

import { scrollToTop, setAlert, setWarning } from 'functions/utils'
import { findChecked } from 'functions/newDance'
import { setImage, reloadImg } from 'functions/images'

export default function CreateStyle({ supplies, flowers, style }) {
    const router = useRouter();

    const { userName, setUserName } = useContext(UserContext)
    const { message, setMessage } = useContext(MessageContext)

    const [file, setFile] = useState('')

    useEffect(() => {
        if (userName === 'default') {
            router.push('/account/login')
        }

        !file ? setFile(style.image) : ''
    }, [file, setFile, style, userName, router])

    const handleOnChange = async (event) => {
        setFile('/no-image.jpg')

        const newPath = `.,public,uploads,tempImage.jpg`
        const response = await setImage(event.target.files[0], newPath)

        if (response.status === 201) {
            setFile(`/uploads/tempImage.jpg`)
            reloadImg(file)
        }
    }

    async function onSubmit(event) {
        let canContinue = []
        event.preventDefault()

        const formData = new FormData(event.target),
            convertedJSON = {};

        formData.forEach(function (value, key) {
            convertedJSON[key] = value;
        });

        if(!convertedJSON.defaultStyle || convertedJSON.description.length === 0 || convertedJSON.name.length === 0 || convertedJSON.flower.length === 0 || convertedJSON.pageColor.length === 0 || convertedJSON.price.length === 0 || !convertedJSON.type) {
            setWarning('Please fill out each field')
            return
        }

        if(convertedJSON.name.includes(',')) {
            setWarning('The name cannot include commas')
            return
        }

        convertedJSON.supplies = findChecked('supplies')

        if (convertedJSON.image.name.length !== 0) {

            // only jpg
            if(convertedJSON.image.type !== 'image/jpeg') {
                setWarning('The image is not the right type. Please upload a jpg or jpeg file')
                return
            }

            // handle image path
            const end = convertedJSON.image.name.split('.')
            const path = `.,public,styles,${convertedJSON.type},${convertedJSON.name.split(' ').join('-')}.${end[end.length - 1]}`

            // save image
            const response = await setImage(convertedJSON.image, path)
            convertedJSON.image = `/styles/${convertedJSON.type}/${convertedJSON.name.split(' ').join('-')}.${end[end.length - 1]}`

            if (response.status !== 201) {
                setWarning('Something went wrong while uploading the image')
                return
            }

        } else {
            delete convertedJSON.image
        }

        try {
            let res = await fetch(`/api/styles/${style[0]._id}/update`, {
                method: 'POST',
                body: JSON.stringify(convertedJSON),
            })

            res = await res.json()

            if (res.ok === 1) {
                setMessage('Successfully edited style')
                router.back()
            }
        } catch (error) {
            console.log('Error: ' + error.message)
            setWarning('Something went wrong with the style creation.')
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