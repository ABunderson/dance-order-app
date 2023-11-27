import { Fragment } from 'react'

import StyleDiv from 'components/account/dances/StyleDiv'
import Line from 'components/Line'

import { FlexCol } from 'components/styles/BasicFlex'
import { FieldsetGridDiv } from 'components/styles/Grid'

const DanceView = ({ dance, styles }) => {
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
            let value
            colorArray.colors.length === index + 1 ? value = `${color}` : value = `${color}, `
            colorList += value
        })

        return colorList

    }


    return (
        <FlexCol>

            <h2>Dance Information</h2>
            <p>Name: {dance.name}</p>
            <p>Date: {dance.danceDate}</p>
            <p>Schools: {getSchools()}</p>

            <Line></Line>

            <h2>Styles</h2>
            <h3>Boutonnieres</h3>

            <FieldsetGridDiv>
                {styles.map((style) => {
                    return dance.styles.includes(style._id) && style.type === 'boutonniere' ? <StyleDiv style={style} key={style._id}></StyleDiv> : <Fragment key={style._id}></Fragment>
                })}
            </FieldsetGridDiv>

            <h3>Corsages</h3>

            <FieldsetGridDiv>
                {styles.map((style) => {
                    return dance.styles.includes(style._id) && style.type === 'corsage' ? <StyleDiv style={style} key={style._id}></StyleDiv> : <Fragment key={style._id}></Fragment>
                })}
            </FieldsetGridDiv>
            <Line></Line>

            <h2>Flowers</h2>

            {dance.flowers.map((flower) => {
                return (
                    <p key={flower.flowerName}><b>{flower.flowerName}:</b> {getColors(flower)}</p>
                )
            })}

            <Line></Line>

        </FlexCol>
    )
}

export default DanceView