import Image from 'next/image'
import styled from 'styled-components'

export const StyledCard = styled.div`
    border: 1px solid black;
    padding: 2rem;
    border-radius: 15px;

    img {
        max-width: 450px;
        width: 100%;
        margin-top: 10px;
        margin-bottom: 10px;
        height: auto;
    }

    &:hover {
        cursor: pointer;
        box-shadow: 10px 10px 10px var(--main-pink);
    }

    @media (max-width: 550px) {
        padding: 1rem;
    }

`

const Card = ({ title, src, alt, imageTitle, description, action }) => {
    return (
        <StyledCard onClick={action}>
            <h2>{title}</h2>
            <Image
                src={src}
                alt={alt}
                title={imageTitle}
                width={500}
                height={500}
                priority
                onError={(e) => {
                    if (e.target.src.includes('no-image')) {
                        e.target.onError = null
                    } else {
                        src = '/no-image.jpg'
                        e.target.alt = 'A placeholder image'
                        e.target.srcset = ''
                        e.target.src = '/no-image.jpg'
                    }
                }
                }
            />
            <p>{description}</p>
        </StyledCard>
    )
}

export default Card