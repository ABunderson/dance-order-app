// import styles from '@/styles/Components.module.css'
import styled from 'styled-components'


const StyledButton = styled.button`

    color: black;
    background-color: var(--main-green);
    border-color: var(--main-green);
    display: inline-block;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    padding: .375rem .75rem;
    border: 1px solid transparent;
    font-size: 2rem;
    border-radius: .3rem;
    transition: background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;

    &:hover {
        background-color: var(--lighter-green);
        border-color: var(--lighter-green);
        box-shadow: 2px 2px var(--main-blue);   
    }
`;

const StyledLargeButton = styled(StyledButton)`
    padding: .5rem 3rem;

    @media (max-width: 550px) {
        width: 100%
    }
`;


const Button = ({ text }) => {
    return (
        <StyledButton type="button">
            {text}
        </StyledButton>
    )
}

export const LargeButton = ({ text }) => {
    return (
        <StyledLargeButton type="button">
            {text}
        </StyledLargeButton>
    )
}

export default Button