import styled from "styled-components"


// use I
const BasicFlex = styled.div`
    display: flex;
    flex-wrap: wrap; 
    gap: 15px;
    font-size: 1.2em;
    align-items: center;
`

// use I
const FlexCol = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 1.5rem;
    width: 100%;

    p {
        text-transform: capitalize;
    }
`

// use II
const Card = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    border-radius: 15px;
    align-items: center;
    padding: 1rem;
    width: auto;
    max-width: 244px;
    flex: 1 0 50%;
    cursor: pointer;

    p {
        text-align: center;
        text-transform: capitalize;
    }

    img, p {
        max-width: 200px;
        width: 100%;
        height: auto;
    }

    @media (max-width: 425px) {
        max-width: 100%;

        img {
            max-width: 100%;
            height: auto;
        }

    }
`

// use II
const ItemList= styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
        font-size: 1.3rem;
    }

    @media (max-width: 450px){
        align-items: flex-start;
    }

    @media (max-width: 400px){
        display: block;
    
        & div {
            padding-top: 20px;
        }
    }
`

// use II
const FlexInfo = styled.div`
    display: flex;
    gap: 20px;
    flex-direction: column;
`

// use II
const FlexDiv = styled.div`
    display: flex;
    flex-wrap: wrap; 
    justify-content: space-around;
    gap: 15px;

    .colorDiv {
        background-color: peach;
        height: 50px;
        width: 50px;
        margin-left: auto;
        margin-right: auto;
        border: 1px solid black;
    }

    @media (max-width: 650px) {
        div {
            width: 100%;
        }
    }
`

export {BasicFlex, FlexCol, Card, ItemList, FlexInfo, FlexDiv}