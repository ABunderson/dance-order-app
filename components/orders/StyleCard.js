

import Image from 'next/image'
import styled from 'styled-components'
import { StyledCard } from 'components/Card'

const StyledStyleCard = styled(StyledCard)`
    max-width: 260px;

    img {
        max-width: 450px;
    }

    @media (max-width: 650px) {
        padding: 1rem;
        width: 100%;
        max-width: 450px;
    }
`;

const StyleCard = ({ style }) => {
    return (
        <StyledStyleCard>
            
            <h2>{style.name}</h2>
            <Image
                src={style.image}
                alt={`A ${style.name} ${style.type}`}
                title={`A ${style.name} ${style.type}`}
                width={500}
                height={500}
                priority
            />
            <p>${style.price}</p>

        </StyledStyleCard>
    )
}

export default StyleCard