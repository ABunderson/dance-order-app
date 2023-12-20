import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'

import UserContext from 'context/UserContext'

import Layout from 'components/allPages/Layout'
import NewUserForm from 'components/account/NewUserForm'
import { Alert } from 'components/allPages/Alert'

import { hashPassword, login } from 'functions/account'
import { setWarning } from 'functions/utils'

export default function NewUser() {
    const router = useRouter()

    const { userName, setUserName } = useContext(UserContext)

    useEffect(() => {
        if (userName !== 'default') {
            router.push('/account')
        }
    }, [router, userName])

    async function onSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.target),
            convertedJSON = {};

        formData.forEach(function (value, key) {
            convertedJSON[key] = value;
        });

        if (convertedJSON.username.length === 0 || convertedJSON.password.length === 0 || convertedJSON.shopCode.length === 0 || convertedJSON.shop.length === 0) {
            setWarning('Please fill in all fields')
            return
        }

        convertedJSON.username = convertedJSON.username.trim()
        convertedJSON.password = convertedJSON.password.trim()
        convertedJSON.shopCode = convertedJSON.shopCode.trim()
        convertedJSON.shop = convertedJSON.shop.trim()

        try {
            if (await checkUserName(convertedJSON.username)) {
                setWarning('That username is already being used. Please pick a different one')
                return
            }

            const pattern = /^(.{0,7}|[^0-9]*|[^A-Z]*|[a-zA-Z0-9]*)$/

            if (pattern.test(convertedJSON.password)) {
                setWarning(`That password doesn't meet the requirements`)
                return
            }

            // convert the shopcode to password hash and check
            convertedJSON.shopCode = await hashPassword(convertedJSON.shopCode)
            if (! await login(convertedJSON.shop, convertedJSON.shopCode)) {
                setWarning('The shop information is not correct')
                return
            }

            //convert password to password hash and add to database
            convertedJSON.password = await hashPassword(convertedJSON.password)
            delete convertedJSON.shop
            delete convertedJSON.shopCode

            let res = await fetch('/api/users', {
                method: 'POST',
                body: JSON.stringify(convertedJSON),
            })
            res = await res.json()

            if (res._id) {
                router.push('/account')
            } else {
                setWarning('New user creation failed')
                return
            }
        } catch (error) {
            console.log('Error: ' + error.message)
            setWarning('Something went wrong with the database connection')
            return
        }
    }

    async function checkUserName(userName) {
        const response = await fetch(`/api/users/${userName}`)
        const data = await response.json()
        return data.users.length === 1 ? true : false
    }

    return (
        <Layout pageTitle="Create User">

            <Alert />

            <h1>Create User</h1>
            <p>This page is only for florists affiliated with this site. If you are not a florist please go back to the home page by clicking on the logo at the top.</p>
            <p>To ensure that only florists affiliated with this site can make new accounts you must know the secret code for your floral shop along with the used shop name.</p>
            
            <NewUserForm action={onSubmit}></NewUserForm>

        </Layout>
    )
}

