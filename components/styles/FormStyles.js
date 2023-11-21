import styled from 'styled-components'

export const StyledForm = styled.form`
    display: flex;
    flex-wrap: wrap; 
    row-gap: 15px;
    font-size: 1.2em;
    align-items: center;

    & input, select, textarea {
        font-size: .75em;
        padding: 5px;
        background-color: gainsboro;
    }

    & button {
        margin-top: 10px;
    }

    @media (max-width: 550px) {
        max-width: 100%;
        width: 100%;

        & input, select, textarea {
            flex-basis: 100%;
            width: 100%;
        }
    
        & label {
            flex-basis: 100%;
        }
    
        & button {
            flex-basis: 100%;
            margin-top: 20px;
        }
    }  
`

export const StyledColumnForm = styled(StyledForm)`

max-width: 400px;

& input, select, textarea {
    flex-basis: 60%;
}

& label {
    flex-basis: 35%;
}

& button {
    flex-basis: 92%;
} 

@media (max-width: 450px) {
    max-width: 100%;
    width: 100%;

    & input, select, textarea {
        flex-basis: 100%;
        width: 100%;
        max-width: 300px;
    }

    & label {
        flex-basis: 100%;
    }

    & button {
        flex-basis: 100%;
        margin-top: 20px;
    }
}  

`;