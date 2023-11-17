import Layout from 'components/allPages/Layout'
import LoginForm from 'components/account/LoginForm'
import { hashPassword } from 'functions/account'
import { useRouter } from 'next/router'

import { alertService } from 'services/alert.service'
import { Alert } from 'components/allPages/Alert'
import { scrollToTop } from 'functions/utils'

import UserContext from 'context/UserContext'
import { useContext } from 'react'

export default function LoginPage() {
    const router = useRouter()
    // console.log(router)
    const {userName, setUserName} = useContext(UserContext)

    async function onSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.target),
            convertedJSON = {};

        formData.forEach(function (value, key) {
            convertedJSON[key] = value;
        });
        // console.log(convertedJSON)

        try {
        convertedJSON.password = await hashPassword(convertedJSON.password)

        const check = await Login(convertedJSON)

        if (check === true) {
            setUserName(convertedJSON.userName)
            router.push('/account')
        } else {
            alertService.warn('Password or Username is incorrect. Please try again', { autoClose: true, keepAfterRouteChange: false })
            event.target.reset()
        }
    } catch (error) {
        console.log('Error: ' + error.message)
        alertService.warn('Something went wrong with the database connection.', { autoClose: false, keepAfterRouteChange: false })
        scrollToTop()
        return
    }

    }

    async function Login(userArray) {
        const status = await fetchUser(userArray.userName, userArray.password)
        // console.log('status = ' + status)
        return status
    }

    async function fetchUser(fUserName, password) {
        const response = await fetch(`/api/users/${fUserName}/${password}`)
        const data = await response.json()
        return data.users.length === 1 ? true : false
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

