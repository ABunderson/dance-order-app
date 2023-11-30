import Image from 'next/image'
import styled from 'styled-components'
import { FlexDiv } from 'components/styles/BasicFlex'
// import { StyledFieldset } from 'components/styles/FieldsetStyles'

export const StyledFieldset = styled.fieldset`
cursor: pointer;
width: 100%;
border: 4px solid var(--main-green);
border-radius: 15px;
padding: 1rem;

legend {
    text-transform: capitalize;
    padding: 5px;
}

input[type='radio'], input[type='checkbox'] {
    display: none;
}

input[type='radio']:checked+label, input[type='checkbox']:checked+label{
   background-color: var(--main-green);
}

p {
    margin-bottom: 10px;
}

.ribbonColors {
    height: 150px;
    width: 150px;
}

.ribbonLabel {
    display: inline-block;
    border-radius: 0;
    border: none;
}

.colorDiv {
    background-color: peach;
    height: 50px;
    width: 50px;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid black;
}

label {
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

    img {
        width: 100%;
        height: auto;
        max-width: 100%;
        min-width: 150px;
    }
}

@media (max-width: 650px){
    label {
        img {
            max-width: 100%;
        }
    }
}
`

const Fieldset = ({ item, type }) => {

    let desc = ''
    // type === 'flower' ? desc = 'pick a color of flower ' : 'not a flower '
    let radioGroup

    switch (type) {
        case 'flower':
            desc = `Pick a color of ${item.name}`
            radioGroup = 'flowerColor'
            break;
        case 'slap':
            desc = `Pick a color of ${item.name} bracelet`
            radioGroup = 'slapColor'
            break;
        case 'metal back':
            desc = `Pick a color of ${item.name}`
            radioGroup = 'metalBackColor'
            break;
        case 'ribbon':
            desc = `Please pick a color category and then talk to an employee to pick a ribbon from the selected color sheet.`
            radioGroup = 'ribbonColor'
            break;
    }



    return (
        <StyledFieldset key={item.name + 'Fieldset'}>
            <legend>{item.name} {type === 'slap' ? 'bracelet' : ''}</legend>
            <p>{desc}. Selected items are green.</p>
            <FlexDiv>
                {type === 'ribbon' ? (
                    item.colors[0].map((color, index) => {
                        return <div key={color + item.name}>
                            {index === 0 ? <input type='radio' name={radioGroup} id={item.name + color} value={color} required defaultChecked/>:<input type='radio' name={radioGroup} id={item.name + color} value={color} required />}
                            <label htmlFor={item.name + color} className='ribbonColors'>
                                <p>{color}</p>
                                <section className='colorDiv' style={{ background: `${color === 'peach' ? 'peachpuff' : color.split(' ').join('')}` }}>

                                </section>
                            </label>
                        </div>
                    })
                ) : (
                    item.colors.map((color, index) => {
                        return (
                            <div key={color.colorName + item.name}>
                                {index === 0 ? <input type='radio' name={radioGroup} id={item.name+color.colorName} value={color.colorName} required defaultChecked/>:<input type='radio' name={radioGroup} id={item.name+color.colorName} value={color.colorName} required />}
                                <label htmlFor={item.name+color.colorName}>
                                    <p>{color.colorName}</p>
                                    <Image
                                        src={color.colorImage}
                                        alt={`A ${color.colorName} ${item.name}`}
                                        title={`Click to select ${color.colorName} ${item.name}`}
                                        width={250}
                                        height={250}
                                        priority
                                        onError={(e) => {            
                                            if (e.target.src.includes('no-image')) {
                                                e.target.onError = null
                                            } else {
                                                color.colorImage = '/no-image.jpg'
                                                e.target.alt = 'A placeholder image'
                                                e.target.srcset = ''   
                                                e.target.src = '/no-image.jpg' 
                                            }  
                                        }}
                                    />
                                </label>
                            </div>
                        )

                    })
                )}
 
            </FlexDiv>

            {type === 'ribbon' ? (
                <>
                    <label htmlFor='ribbonColor' className='ribbonLabel'>Ribbon Color: </label>
                    <input name='ribbonColor' type='text' required />
                </>
            ) : (
                <></>
            )}
        </StyledFieldset >
    )
}

export default Fieldset