import styled from 'styled-components'

export const StyledButton = styled.button`
    color: black;
    background-color: var(--main-green);
    border-color: var(--main-green);
    display: inline-block;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    padding: .375rem .75rem;
    border: 1px solid transparent;
    font-size: 1.5rem;
    border-radius: .3rem;
    transition: background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
    cursor: pointer;

    &:hover {
        background-color: var(--lighter-green);
        border-color: var(--lighter-green);
        box-shadow: 2px 2px var(--main-blue);   
    }

`;

export const StyledLargeButton = styled(StyledButton)`
    padding: .5rem 3rem;
    font-size: 2rem;

    @media (max-width: 550px) {
        width: 100%
    }
`

// use IIII
export const FlexButton = styled.div`
    display: flex;
    justify-content: center;
    gap: 50px;

    @media (max-width: 670px){
        flex-direction: column;
        gap: 2rem;
        padding-bottom: 1rem;
    }
`

export const SmallFlexButton = styled(FlexButton)`
    gap: 30px;
    flex-wrap: wrap;
    justify-content: flex-start;

    @media (max-width: 670px){
        flex-direction: row;
        gap: 30px;
        padding-bottom: inherit;
    }

    @media (max-width: 400px){
        flex-direction: column;
        gap: 2rem;
        padding-bottom: 1rem;
    }
`