import styled from "styled-components"

const FlexDiv = styled.div`
    display: flex;
    gap: 15px;

    > div {
        width: 50%;
    }

    @media (max-width: 650px) {
        flex-wrap: wrap;

        > div {
            width: 100%;
        }
    }
`

const FlexRow = ({ children }) => {

    return (
        <FlexDiv>
            {children}
        </FlexDiv>
    )

}

export default FlexRow