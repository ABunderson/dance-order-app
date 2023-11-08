import { Fragment } from "react"

const AddonRows = ({ style, order }) => {

    const addons = order.addon

    return (
        <>
            {addons?.map((item) => {
                const pieceArray = []

                for (let key of Object.keys(item)) {

                    if (key === 'name') {
                        pieceArray.push(<tr className="addonHead"><td colSpan={2}>{item.name}</td></tr>)
                    } else if (key === 'price'){

                        if(item[key] < 1){
                            const price = item[key] * 100
                            pieceArray.push(<tr><td>{key}:</td><td>{price}￠</td></tr>)
                        } else {
                            pieceArray.push(<tr><td>{key}:</td><td>${item[key]}</td></tr>)
                        }
                    } else {
                        pieceArray.push(<tr><td>{key}:</td><td>{item[key]}</td></tr>)
                    }
                }
                return (
                    <>
                        {pieceArray.map((item) => {
                            return item
                        })}

                    </>
                )
            })}
        </>
    )
}

export default AddonRows