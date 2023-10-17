import styled from 'styled-components'

const StyledLine = styled.hr`
    width: 100%;
    height: 3px;
    background-color: var(--main-green);
    border: none;
`

const Line = () => {
    return (
        <StyledLine>

        </StyledLine>
    )
}

export default Line

{/* <hr style={{width:'100%', height: '5px', color: var(--main-green)}}/> */}