import Image from "next/image"
import styled from "styled-components"
import { StyledFieldset } from "components/styles/FieldsetStyles"



const GridDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(8em, 12em));
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
            height: auto;
        }
    }
    @media (max-width: 650px) {
        label {
            img {
                max-width: 100%;
                height: auto;
            } 
        }
    }
`

const ArrayFieldset = ({ styles, dance }) => {

    return (
        <Fieldset>
            <legend>Styles</legend>
            <p>Green boxes mean the style is selected. {dance ? 'Prior selections for this dance start green.' : 'Default styles start out selected.'}</p>
            <GridDiv>
                {styles?.map((style) => {

                    return (
                        <div key={style._id} className='item'>
                            <input type='checkbox' className='styles' name='styles' id={'styles ' + style._id} value={style._id} defaultChecked={dance ? dance.styles.includes(style._id) : style.defaultStyle} />
                            <label htmlFor={'styles ' + style._id}>
                                <p>{style.name} {style.type}</p>
                                <Image

                                    src={style.image}
                                    alt={`${style.name} ${style.type}`}
                                    title={`Click to select ${style.name} ${style.type}`}
                                    width={250}
                                    height={250}
                                    priority
                                    onError={(e) => {
                                        if (e.target.src.includes('no-image')) {
                                            e.target.onError = null
                                        } else {
                                            style.image = '/no-image.jpg'
                                            e.target.alt = 'A placeholder image'
                                            e.target.srcset = ''
                                            e.target.src = '/no-image.jpg'
                                        }
                                    }}
                                />
                            </label>
                        </div>
                    )
                })}
            </GridDiv>

        </Fieldset>
    )
}

export default ArrayFieldset