import styled from 'styled-components'
import { StyledLargeButton } from 'components/styles/ButtonStyles'

// const Button = ({ text }) => {
//     return (
//         <StyledButton type="button">
//             {text}
//         </StyledButton>
//     )
// }

const Button = ({ text, type, action }) => {
    return (
        <StyledLargeButton type={type} onClick={action}>
            {text}
        </StyledLargeButton>
    )
}

export default Button