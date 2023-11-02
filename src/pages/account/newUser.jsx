import Layout from 'components/Layout'
import NewUserForm from 'components/account/NewUserForm'
import { hashPassword } from 'components/account/Hashing'
import { useRouter } from 'next/router'
import { Alert } from 'components/Alert'
import { alertService } from '../../../services/alert.service'

import UserContext from 'context/UserContext'
import { useContext } from 'react'

export default function LoginPage() {
    const router = useRouter()
    const user = useContext(UserContext)

    async function onSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.target),
            convertedJSON = {};

        formData.forEach(function (value, key) {
            convertedJSON[key] = value;
        });

        if (convertedJSON.username.length === 0 || convertedJSON.password.length === 0 || convertedJSON.shopCode.length === 0 || convertedJSON.shop.length === 0) {
            alertService.warn('Please fill in all fields.', { autoClose: false, keepAfterRouteChange: false })
            return
        }

        if (await checkUserName(convertedJSON.username)) {
            alertService.warn('That username is already being used. Please pick a different one.', { autoClose: false, keepAfterRouteChange: false })
            return
        }

        const pattern = /^(.{0,7}|[^0-9]*|[^A-Z]*|[a-zA-Z0-9]*)$/
        if (pattern.test(convertedJSON.password)) {
            alertService.warn(`That password doesn't meet the requirements`, { autoClose: false, keepAfterRouteChange: false })
            return
        }

        // convert the shopcode to password hash and check
        convertedJSON.shopCode = await hashPassword(convertedJSON.shopCode)
        if (! await fetchUser(convertedJSON.shop, convertedJSON.shopCode)){
            alertService.warn(`The shop information is not correct.`, { autoClose: false, keepAfterRouteChange: false })
            return
        } 

        //convert password to password hash and add to database
        convertedJSON.password = await hashPassword(convertedJSON.password)
        delete convertedJSON.shop
        delete convertedJSON.shopCode
        console.log(convertedJSON)

        

        let res = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify(convertedJSON),
        })
        res = await res.json()
        console.log(res)
        console.log(res._id)

        if (res._id) {
            router.push('/account')
        } else {
            alertService.warn(`Something unexpected went wrong. Try waiting or contacting the site creator.`, { autoClose: false, keepAfterRouteChange: false })
            return
        }
    }

    async function fetchUser(userName, password) {
        const response = await fetch(`/api/users/${userName}/${password}`)
        const data = await response.json()
        return data.users.length === 1 ? true : false
    }

    async function checkUserName(userName) {
        const response = await fetch(`/api/users/${userName}`)
        const data = await response.json()
        return data.users.length === 1 ? true : false
    }

    return (
        <Layout pageTitle="New User">
            <Alert />
            <h1>Create User</h1>
            <p>This page is only for florists affiliate with the site. If you are not a florist please go back to the home page by clicking on the logo at the top.</p>
            <p>To ensure that only florists affiliated with the site can make new accounts you must know the secret code for the business.</p>
            <NewUserForm action={onSubmit}></NewUserForm>

        </Layout>

    )
}

