import { Fragment } from "react"


const StyleRows = ({ style, order }) => {

    return (
        
        <>
        {Object.entries(style).map((item) => {

            //check for flowercolor instead of flower because objects go in a weird order otherwise
            if (item[0] === 'flowerColor'){
                return <Fragment key={item[0]+'styleRows'}><tr><td>Flower:</td><td>{style.flower}</td></tr><tr><td>Flower Color:</td><td>{style.flowerColor}</td></tr></Fragment>
            }
            if (item[0] === 'slapColor') {
                return <tr key={item[0] + 'styleRows'}><td>Slap Bracelet Color:</td><td>{style.slapColor}</td></tr>
            }
            if (item[0] === 'ribbonColor'){
                return <tr key={item[0] + 'styleRows'}><td>Ribbon Color:</td><td>{style.ribbonColor}</td></tr>
            }
            if (item[0] === 'metalBackColor'){
                return <tr key={item[0] + 'styleRows'}><td>Metal Back Color:</td><td>{style.metalBackColor}</td></tr>
            }

        })}
        <tr><td>Price:</td><td>{'$'+style.price}</td></tr>
        </>
    )
}

export default StyleRows