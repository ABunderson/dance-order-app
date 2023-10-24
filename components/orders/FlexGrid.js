import styled from "styled-components"

export const FlexDiv = styled.div`
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    justify-content: space-evenly;


    > div {
        width: auto;
    }

    @media (max-width: 650px) {
        flex-wrap: wrap;

        > div {
            width: 100%;
        }
    }
`

const FlexGrid = ({ children }) => {

    return (
        <FlexDiv>
            {children}
        </FlexDiv>
    )

}

export default FlexGrid