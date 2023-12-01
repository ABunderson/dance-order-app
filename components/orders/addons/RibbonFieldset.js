import { StyledFieldset } from 'components/styles/FieldsetStyles'
import { FlexDiv } from 'components/styles/BasicFlex'

const RibbonFieldset = ({ item, ribbon, keyValue, order }) => {

    let name = item.name
    name = name.split(' ').join('')
    const radioGroup = name + 'Ribbon'

    ribbon = ribbon[0]
    let price = item.price
    let sign = '$'

    if (item.price < 1) {
        price = item.price * 100
        sign = '￠'
    }

    return (
        // <p key={keyName}>ribbon</p>)
        <StyledFieldset>
            <legend>{item.name}</legend>
            <p>{order.ribbonColor ?  item.description.includes('bow') ? 'Have a bow with two ribbon colors.' : 'Add another ribbon to your boutonniere' :item.description}</p>
            <p>{sign === '$' ? `${sign}${price}`: `${price}${sign} `}{item.limit ? '':' each'}</p>
            <FlexDiv key={keyValue + 'div'}>
                {ribbon.colors[0].map((color) => {

                    let keyName = color + item.name;
                    keyName = keyName.split(' ').join('')
                    return (
                        <div key={keyName}>
                            <input type='radio' name={radioGroup} id={color.split(' ').join('')} value={color} />
                            <label htmlFor={color.split(' ').join('')} className='ribbonColors'>
                                <span>{color}</span>
                                <span className='colorDiv' style={color === 'peach' ? { background: 'peachpuff'} : { background: `${color.split(' ').join('')}` }}>

                                </span>
                            </label>
                        </div>
                        )
                })}
            </FlexDiv>
            <label htmlFor='ribbonColor' className='ribbonLabel'>Ribbon Color: </label>
            <input name='ribbonColor' id='ribbonColor' type='text'/>
         </StyledFieldset >
     )
}

export default RibbonFieldset