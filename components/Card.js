import Image from 'next/image'
import styled from 'styled-components'

const StyledCard = styled.div`
    border: 1px solid black;
    padding: 2rem;

    img {
        max-width: 450px;
        width: 100%;
        margin-top: 10px;
        margin-bottom: 10px;
        height: auto;
    }

    @media (max-width: 550px) {
        padding: 1rem;

        // img {
        //     max-width: 100%;
        //     height: auto;
        // }

    }

`



const Card = ({ title, src, alt, imageTitle, description }) => {
    return (
        <StyledCard>
            <h2>{title}</h2>
            <Image
                src={src}
                alt={alt}
                title={imageTitle}
                width={500}
                height={500}
                priority
            />
            <p>{description}</p>
        </StyledCard>
    )
}

export default Card