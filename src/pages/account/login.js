import Layout from 'components/Layout'
import LoginForm from 'components/account/LoginForm'
import { hashPassword} from 'components/account/Hashing'
import { useRouter } from 'next/router'
import { Alert } from 'components/Alert'
import { alertService } from '../../../services/alert.service'

export default function LoginPage() {
    const router = useRouter()
    // console.log(router)

    async function onSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.target),
            convertedJSON = {};

        formData.forEach(function (value, key) {
            convertedJSON[key] = value;
        });
        // console.log(convertedJSON)
        convertedJSON.password = await hashPassword(convertedJSON.password)

        const check = await Login(convertedJSON)

        if (check === true) {
            router.push('/account')
        } else {
            alertService.warn('Password or Username is incorrect. Please try again', {autoClose: true, keepAfterRouteChange: false})
           event.target.reset() 
        }
 
    }

    async function Login(userArray) {
        const status = await fetchUser(userArray.userName, userArray.password)
        // console.log('status = ' + status)
        return status
    }
    
    async function fetchUser(userName, password) {
        const response = await fetch(`/api/users/${userName}/${password}`)
        const data = await response.json()
        return data.users.length === 1 ? true : false
    }

    return (
        <Layout pageTitle="Login">
            <Alert />
            <h1>Important!</h1>
            <p>This page is only for florists affiliate with the site. If you are not a florist please go back to the home page by clicking on the logo at the top.</p>
            <LoginForm action={onSubmit}></LoginForm>

        </Layout>

    )
}

