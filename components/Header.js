import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'

const StyledHeader = styled.header`
    background-color: var(--main-green);

    @media (max-width: 550px) {
        padding-left: 0;
        padding-right: 0;
    }

    .headerDiv {
        padding-left: 3rem;
        padding-right: 3rem;
        max-width: var(--max-width);
        margin: auto;
        display: flex;
        justify-content: space-between;

        @media (max-width: 550px) {
            padding-left: 1rem;
            padding-right: 1rem;
        }
    }
`;

const Header = () => {
    return (
        <StyledHeader>
            <div className='headerDiv'>
                <Link href="/">
                    <Image
                        // className={styles.logo}
                        src="/icons/logo.png"
                        alt="A logo image of a flower. Icon from Icons8"
                        title="Home page"
                        width={80}
                        height={80}
                        priority
                    />
                </Link>
                
                <Link href="/account/login">
                    <Image
                        src="/icons/account.png"
                        alt="An Account icon. Icon from Icons8"
                        title="Click to login to your account. Florists only"
                        width={80}
                        height={80}
                        priority
                    />
                </Link>
            </div>
        </StyledHeader>
    )
}

export default Header