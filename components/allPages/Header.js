import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import UserContext from 'context/UserContext';
import { useContext } from 'react'

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

        a {
            display: flex;
            align-items: center;
        }

        @media (max-width: 550px) {
            padding-left: 1rem;
            padding-right: 1rem;
        }
    }
`;

const Header = () => {

    const user = useContext(UserContext)
    return (
        <StyledHeader>
            <div className='headerDiv'>
                <Link href="/">
                    <Image
                        src="/icons/logo.png"
                        alt="A logo image of a flower. Icon from Icons8"
                        title="Home page"
                        width={80}
                        height={80}
                        priority
                    />
                    <h1>Flower Shop Name</h1>
                </Link>
                
                <Link href={user.userName !== 'default' ? '/account' : "/account/login"}>
                    <Image
                        src="/icons/account.png"
                        alt="An Account icon. Icon from Icons8"
                        title="Click to login to your account. Florists only"
                        width={40}
                        height={40}
                        priority
                    />
                </Link>
            </div>
        </StyledHeader>
    )
}

export default Header