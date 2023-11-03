import { Fragment } from "react"


const StyleRows = ({ style, order }) => {
    console.log(style)

    // let newStyle = { ...style }
    // const handleObject = (style) => {
    //     delete style.price
    //     delete style._id
    //     delete style.description
    //     delete style.image
    //     delete style.name
    //     delete style.popular
    //     delete style.type
    //     delete style.pageColor
    //     delete style.defaultStyle
    // }

    // handleObject(newStyle)
    // const styleArray = Object.entries(newStyle)

    return (
        
        <>
        {Object.entries(style).map((item) => {
            // console.log(item[0])
            //check for flowercolor instead of flower because objects go in a weird order otherwise
            if (item[0] === 'flowerColor' && item[1] !== 'null'){
                return <Fragment key={item[0]+'styleRows'}><tr><td>Flower:</td><td>{style.flower}</td></tr><tr><td>Flower Color:</td><td>{style.flowerColor}</td></tr></Fragment>
            }
            if (item[0] === 'wristlet' && item[1] === 'slap' && style.slapColor) {
                return <tr key={item[0] + 'styleRows'}><td>Slap Bracelet Color:</td><td>{style.slapColor}</td></tr>
            }
            if (item[0] === 'ribbon' && item[1] === true){
                return <tr key={item[0] + 'styleRows'}><td>Ribbon Color:</td><td>{style.ribbonColor}</td></tr>
            }
            if (item[0] === 'metalBackColor' && item[1] !== 'null'){
                return <tr key={item[0] + 'styleRows'}><td>Metal Back Color:</td><td>{style.metalBackColor}</td></tr>
            }

        })}
        <tr><td>Price:</td><td>{'$'+style.price}</td></tr>
        </>
    )
}

export default StyleRows