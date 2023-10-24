import Image from "next/image"
import styled from "styled-components"
import { StyledFieldset } from "components/styles/FieldsetStyles"



const FlexDiv = styled.div`
    display: flex;
    flex-wrap: wrap; 
    justify-content: space-around;
    gap: 10px;
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
const Fieldset = styled(StyledFieldset)`
    label {
        height: 100%;
        img, p {
            text-align: center;
            max-width: 250px;
            width: 100%;
        }
    }
    @media (max-width: 650px) {
        label {
            img {
                max-width: 100%;
            }
        }
    }
`

const ArrayFieldset = ({ styles, dance }) => {
    // console.log(styles)
    // console.log(dance)

    return (
        <Fieldset>
            <legend>Styles</legend>
            <p>Green boxes mean the style is selected. {dance ? 'Prior selections for this dance start green.': 'Default styles start out selected.'}</p>
            <FlexDiv>
                {styles?.map((style) => {
                    // console.log(style)
                    return (
                        <div key={style._id}>
                            <input type='checkbox' className='styles' name='styles' id={'styles ' + style._id} value={style._id} defaultChecked={dance ? dance.styles.includes(style._id): style.defaultStyle}/>
                            <label htmlFor={'styles ' + style._id}>
                                <p>{style.name} {style.type}</p>
                                <Image
                                    src={style.image}
                                    alt={`${style.name} ${style.type}`}
                                    title={`Click to select ${style.name} ${style.type}`}
                                    width={250}
                                    height={250}
                                    priority />
                            </label>
                        </div>
                    )
                })}
            </FlexDiv>

        </Fieldset>
    )
}

export default ArrayFieldset