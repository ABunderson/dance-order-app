import Layout from 'components/Layout'
import LoginForm from 'components/account/LoginForm'

export default function LoginPage() {

    return (
        <Layout pageTitle="Login">
            <h1>Important!</h1>
            <p>This page is only for florists affiliate with the site. If you are not a florist please go back to the home page by clicking on the logo at the top.</p>
            <LoginForm></LoginForm>

        </Layout>

    )
}

