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
    console.log('should be flexed')
    console.log(children)

    return (
        <FlexDiv>
            {/* {Children.map(children, child => {
                {console.log(child)}
                <FlexItem>
                {child}
                </FlexItem>
            })} */}

            {children}
        </FlexDiv>
    )

}

export default FlexRow