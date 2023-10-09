import Header from 'components/Header'
import Footer from 'components/Footer'
import Head from 'next/head'
import styled from 'styled-components'

const StyledMain = styled.main`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;

    padding: 3rem;
    min-height: 80vh;
    max-width: var(--max-width);
    margin: auto;

    @media (max-width: 550px) {
        padding: 1rem;
    }
`;

export default function Layout({ pageTitle, children }) {
    return (
        <>
            <Head>
                <title>{`TPD Dance Orders | ${pageTitle}`}</title>
                <meta name="description" content="Order a Boutonniere or Corsage with TPD Florist" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/icons/favicon.png" />
            </Head>
            <Header></Header>
            <StyledMain>{children}</StyledMain>
            <Footer></Footer>
        </>
    )
}