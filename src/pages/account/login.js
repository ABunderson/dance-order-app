import Layout from 'components/Layout'
import LoginForm from 'components/account/LoginForm'
import { hashPassword} from 'components/account/Hashing'

export default function LoginPage() {

    async function onSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.target),
            convertedJSON = {};

        formData.forEach(function (value, key) {
            convertedJSON[key] = value;
        });
        // console.log(convertedJSON)
        convertedJSON.password = await hashPassword(convertedJSON.password)

        Login(convertedJSON)

        event.target.reset()
    }

    async function Login(userArray) {
        const status = await fetchUser(userArray.userName, userArray.password)
        console.log('status = ' + status)
    }
    
    async function fetchUser(userName, password) {
        const response = await fetch(`/api/users/${userName}/${password}`)
        const data = await response.json()
        return data.users.length === 1 ? true : false
    }

    return (
        <Layout pageTitle="Login">
            <h1>Important!</h1>
            <p>This page is only for florists affiliate with the site. If you are not a florist please go back to the home page by clicking on the logo at the top.</p>
            <LoginForm action={onSubmit}></LoginForm>

        </Layout>

    )
}

