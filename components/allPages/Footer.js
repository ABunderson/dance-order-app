import Image from 'next/image'
import styled from 'styled-components'

const StyledFooter = styled.footer`
    background-color: var(--main-green);

    .footerDiv {
        padding: 5px 3rem;
        min-height: 80px;
        max-width: var(--max-width);
        margin: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.1rem;

        @media (max-width: 550px) {
            flex-direction: column;
            padding: 5px;
            justify-content: center;
        }
    }
`;


const Footer = () => {
    return (
        <StyledFooter>
            <div className="footerDiv">
                <p>&copy;2023 Bunderson </p>
                <p>icons by <a href="https://icons8.com/" target="_blank">Icons8</a></p>
                <div>
                    <a href="https://www.facebook.com/" target='_blank'>
                        <Image
                            className="socialIcon"
                            src="/icons/facebook.svg"
                            alt="The Facebook icon. Icon from Icons8"
                            title="Florists Facebook page"
                            width={50}
                            height={50}
                            priority
                        />
                    </a>
                    <a href="https://www.pinterest.com/" target="_blank">
                        <Image
                            className="socialIcon"
                            src="/icons/pinterest.svg"
                            alt="A Pinterest icon. Icon from Icons8"
                            title="Florists Facebook page"
                            width={50}
                            height={50}
                            priority
                        />
                    </a>
                    <a href="https://www.instagram.com/" target="_blank">
                        <Image
                            className="socialIcon"
                            src="/icons/instagram.svg"
                            alt="An Instagram icon. Icon from Icons8"
                            title="Florists Instagram page"
                            width={50}
                            height={50}
                            priority
                        />
                    </a>
                </div>
            </div>
        </StyledFooter>
    )
}

export default Footer