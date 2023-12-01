import Image from 'next/image'
import styled from 'styled-components'

const HomeImage = styled.div`
    img {
        max-width: 100%;
        max-height: 30rem;
        object-fit: cover;

        @media (max-width: 700px) {
        height: auto;
        }
    }
`

const HeroImage = () => {
    return (
        <HomeImage>
            <Image
                src="/hero.jpg"
                alt="A matching corsage and boutonniere set made with white ranunculus"
                height={2468}
                width={4032}
                priority
            />
        </HomeImage>
    )
}

export default HeroImage