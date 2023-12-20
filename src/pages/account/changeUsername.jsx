import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'

import UserContext from 'context/UserContext'
import MessageContext from 'context/MessageContext'

import Layout from 'components/allPages/Layout'
import UsernameForm from 'components/account/UsernameForm'
import { Alert } from 'components/allPages/Alert'

import { hashPassword } from 'functions/account'
import { setWarning } from 'functions/utils'

export default function ChangeUsername() {
    const router = useRouter()

    const { userName, setUserName } = useContext(UserContext)
    const { message, setMessage } = useContext(MessageContext)

    useEffect(() => {
        if (userName === 'default') {
            router.push('/account/login')
        }
    }, [router, userName])

    async function onSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.target),
            convertedJSON = {};

        formData.forEach(function (value, key) {
            convertedJSON[key] = value;
        });

        if (convertedJSON.username.length === 0) {
            setWarning('Please choose a new username')
            return
        }

        convertedJSON.username = convertedJSON.username.trim()

        try {
            if (await checkUserName(convertedJSON.username)) {
                setWarning('That username is already being used. Please pick a different one')
                return
            }

            // update
            let res = await fetch(`/api/users/update/${userName}`, {
                method: 'POST',
                body: JSON.stringify(convertedJSON),
            })

            res = await res.json()

            if (res.result.ok === 1) {
                setUserName(convertedJSON.username)
                setMessage('Successfully changed username')
                router.push('/account')
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
        <Layout pageTitle="Change Username">

            <Alert />

            <h1>Change Username</h1>
            <p>Put in the new username for this account.</p>

            <UsernameForm action={onSubmit}></UsernameForm>

        </Layout>
    )
}

