import Layout from 'components/Layout'





export default function PageNotFound() {

    return (
        <Layout pageTitle="404 Error">

            <h1>404 Page | The page you are looking for cannot be found</h1>
            <h2>This could be a connection to the database error or a navigation error</h2>
            <p>
                {`Note! This website only works on approved wifi networks. If you are not on an approved
                network you can contact the creator of the site to be added. If you don't know who that is,
                it is a good sign that your network shouldn't be approved.`}
            </p>
            <p>
                {`If you are on an approved network try closing the tab and 
                re-navigating to the home page and then contact the site creator if it still doesn't work.`}
            </p>

        </Layout>
    )
}