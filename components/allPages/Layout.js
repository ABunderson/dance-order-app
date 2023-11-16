import Head from 'next/head'
import styled from 'styled-components'

import Header from 'components/allPages/Header'
import Footer from 'components/allPages/Footer'

const StyledMain = styled.main`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
    padding: 3rem;
    min-height: 85vh;
    max-width: var(--max-width);
    margin: auto;
    font-size: 1.2em;

    @media (max-width: 550px) {
        padding: 1rem;
    }
`;

export default function Layout({ pageTitle, children }) {
    return (
        <>
            <Head>
                <title style={{ textTransform: 'capitalize' }}>{`TPD Dance Orders | ${pageTitle}`}</title>
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