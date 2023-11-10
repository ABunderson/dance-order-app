const setDate = (dateObject) => {
    const newDate = new Date(dateObject)

    const months = ["Jan.", "Feb.", "March", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
    const month = months[newDate.getMonth()]

    return `${month} ${newDate.getDate()}`
}

const getTotal = (order) => {
    let total = 0
    total += order?.style.price
    order?.addon?.map((item) => {
        item.price ? total += item.price : ''
    })
    return total
}



export {setDate, getTotal}