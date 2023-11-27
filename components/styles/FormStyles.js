import styled from 'styled-components'

// use III
export const StyledForm = styled.form`
    display: flex;
    flex-wrap: wrap; 
    row-gap: 15px;
    font-size: 1.2em;
    align-items: center;

    input, select, textarea {
        font-size: .75em;
        padding: 5px;
        background-color: gainsboro;
    }

    button {
        margin-top: 10px;
    }

    @media (max-width: 550px) {
        max-width: 100%;
        width: 100%;

        input, select, textarea {
            flex-basis: 100%;
            width: 100%;
        }
    
        label {
            flex-basis: 100%;
        }
    
        button {
            flex-basis: 100%;
            margin-top: 20px;
        }
    }  
`

// use III
export const StyledColumnForm = styled(StyledForm)`

    max-width: 450px;

    input, select, textarea {
        flex-basis: 60%;
    }

    label {
        flex-basis: 35%;
    }

    button {
        flex-basis: 92%;
    } 

    @media (max-width: 450px) {
        max-width: 100%;
        width: 100%;

        input, select, textarea {
            flex-basis: 100%;
            width: 100%;
            max-width: 300px;
        }

        label {
            flex-basis: 100%;
        }

        button {
            flex-basis: 100%;
            margin-top: 20px;
        }
    }  

`
// use I
export const RadioRules = styled.div`
    input[type='radio'], input[type='checkbox'] {
        display: none;
    }

    input[type='radio']:checked+label, input[type='checkbox']:checked+label{
        background-color: var(--main-green);
    }

    label {
        flex-grow: 2;
        display: block;
        border: 1px solid black;
        border-radius: 15px;
        height: auto;
        padding: 1rem;
        width: auto;

        p {
            text-align: center;
            text-transform: capitalize;
        }
    }
`
