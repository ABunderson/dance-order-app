import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'

import UserContext from 'context/UserContext'
import MessageContext from 'context/MessageContext'

import Layout from 'components/allPages/Layout'
import PasswordForm from 'components/account/PasswordForm'
import { Alert } from 'components/allPages/Alert'

import { hashPassword } from 'functions/account'
import { setWarning } from 'functions/utils'

export default function ChangePassword() {
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

        if (convertedJSON.password.length === 0) {
            setWarning('Please choose a new password')
            return
        }

        convertedJSON.password = convertedJSON.password.trim()

        try {
            const pattern = /^(.{0,7}|[^0-9]*|[^A-Z]*|[a-zA-Z0-9]*)$/

            if (pattern.test(convertedJSON.password)) {
                setWarning(`That password doesn't meet the requirements`)
                return
            }

            //convert password to password hash
            convertedJSON.password = await hashPassword(convertedJSON.password)

            // update
            let res = await fetch(`/api/users/update/${userName}`, {
                method: 'POST',
                body: JSON.stringify(convertedJSON),
            })

            res = await res.json()

            if (res.result.ok === 1) {
                setMessage('Successfully changed password')
                router.push('/account')
            }

        } catch (error) {
            console.log('Error: ' + error.message)
            setWarning('Something went wrong with the database connection')
            return
        }
    }

    return (
        <Layout pageTitle="Change Password">

            <Alert />

            <h1>Change Password</h1>
            <p>Put in the new password for this account.</p>

            <PasswordForm action={onSubmit}></PasswordForm>

        </Layout>
    )
}

