import Image from 'next/image'

import { FieldsetGridDiv } from 'components/styles/Grid'
import { DanceFieldset } from 'components/styles/FieldsetStyles'

const StyleFieldset = ({ styles, dance }) => {

    return (
        <DanceFieldset>
            <legend>Styles</legend>
            <p>Green boxes mean the style is selected. {dance ? 'Prior selections for this dance start green.' : 'Default styles start out selected.'}</p>
            <FieldsetGridDiv>
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
            </FieldsetGridDiv>

        </DanceFieldset>
    )
}

export default StyleFieldset