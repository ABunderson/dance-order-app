import styled from 'styled-components'

const StyledLine = styled.hr`
    width: 100%;
    height: 3px;
    background-color: var(--main-green);
    border: none;
`
const StyledSmallLine = styled.hr`
    width: 100%;
    height: 1px;
    background-color: var(--main-green);
    border: none;
`

const Line = () => {
    return (
        <StyledLine>

        </StyledLine>
    )
}

const SmallLine = () => {
    return (
        <StyledSmallLine>

        </StyledSmallLine>
    )
}

export default Line

export { SmallLine }

{/* <hr style={{width:'100%', height: '5px', color: var(--main-green)}}/> */}