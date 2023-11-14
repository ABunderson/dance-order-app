import styled from "styled-components";
import Image from "next/image";

const StyleBlock = styled.div`
display: flex;
flex-direction: column;
border: 1px solid black;
border-radius: 15px;
align-items: center;
padding: 1rem;
width: auto;
max-width: 244px;
flex: 1 0 50%;

p {
    text-align: center;
    text-transform: capitalize;
}

img, p {
    max-width: 200px;
    width: 100%;
    height: auto;
}

@media (max-width: 425px) {
    max-width: 100%;

    img {
        max-width: 100%;
        height: auto;
    }

}
`

const StyleDiv = (style) => {
    style = style.style

    return (
        <StyleBlock key={style._id}>
            <p>{style.name}</p>

            <Image
                src={style.image}
                alt={`${style.name} ${style.type}`}
                title={`A ${style.name} ${style.type}`}
                width={250}
                height={250}
                priority 
                onError={(e) => {
                    if (e.target.src.includes('no-image')) {
                        e.target.onError = null
                    } else {
                        style.image = '/no-image.jpg'
                        e.target.alt = 'A placeholder image'
                        e.target.srcset = ''
                        e.target.src = '/no-image.jpg'
                    }
                }}
            />

        </StyleBlock>
    )

}

export default StyleDiv