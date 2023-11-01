import styled from "styled-components"
import { Fragment } from "react"
import StyleDiv from "./StyleDiv"
import Line from 'components/Line'


const OutputDiv = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
gap: 2rem;
width: 100%;

p {
    text-transform: capitalize;
}
`
const FlexDiv = styled.div`
    display: flex;
    flex-wrap: wrap; 
    justify-content: space-around;
    gap: 15px;
    row-gap: 30px;

    @media (max-width: 650px) {
        p {
            text-align: center;
        }
        div {
            width: 100%;
            
        }
    }
`



const DanceView = ({ dance, styles }) => {
    // console.log(dance)
    dance = dance[0]

    const getSchools = () => {
        let schoolsList = ''
        dance.schools.map((school, index) => {
            let value
            dance.schools.length === index + 1 ? value = `${school}` : value = `${school}, `
            schoolsList += value
        })
        return schoolsList
    }

    const getColors = (colorArray) => {
        let colorList = ''
        colorArray.colors.map((color, index) => {
            // console.log(flower)
            let value
            colorArray.colors.length === index + 1 ? value = `${color}` : value = `${color}, `
            colorList += value
        })

        return colorList

    }


    return (
        <OutputDiv>

            <h2>Dance Information</h2>
            <p>Name: {dance.name}</p>
            <p>Date: {dance.danceDate}</p>
            <p>Schools: {getSchools()}</p>

            <Line></Line>

            <h2>Styles</h2>
            <h3>Boutonnieres</h3>
            <FlexDiv>
                {styles.map((style) => {
                    return dance.styles.includes(style._id) && style.type === 'boutonniere' ? <StyleDiv style={style} key={style._id}></StyleDiv> : <Fragment key={style._id}></Fragment>
                })}
            </FlexDiv>
            <h3>Corsages</h3>
            <FlexDiv>
                {styles.map((style) => {
                    return dance.styles.includes(style._id) && style.type === 'corsage' ? <StyleDiv style={style} key={style._id}></StyleDiv> : <Fragment key={style._id}></Fragment>
                })}
            </FlexDiv>
            <Line></Line>

            <h2>Flowers</h2>

            {dance.flowers.map((flower) => {
                // console.log(flower.name)
                return (
                    <p key={flower.flowerName}><b>{flower.flowerName}:</b> {getColors(flower)}</p>
                )
            })}

            <Line></Line>

        </OutputDiv>
    )
}

export default DanceView