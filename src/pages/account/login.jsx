import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'

import UserContext from 'context/UserContext'

import Layout from 'components/allPages/Layout'
import LoginForm from 'components/account/LoginForm'
import { Alert } from 'components/allPages/Alert'

import { hashPassword, login } from 'functions/account'
import { setWarning } from 'functions/utils'

export default function LoginPage() {
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

        try {
            convertedJSON.password = await hashPassword(convertedJSON.password)

            const check = await login(convertedJSON.userName, convertedJSON.password)

            if (check === true) {
                setUserName(convertedJSON.userName)
                router.push('/account')
            } else {
                setWarning('Password or Username is incorrect. Please try again')
                event.target.reset()
            }
        } catch (error) {
            console.log('Error: ' + error.message)
            setWarning('Something went wrong with the database connection')
            return
        }
    }

    return (
        <Layout pageTitle="Login">

            <Alert />

            <h1>Important!</h1>
            <p>This page is only for florists affiliated with this site. If you are not a florist please go back to the home page by clicking on the logo at the top.</p>
            
            <LoginForm action={onSubmit}></LoginForm>

        </Layout>
    )
}