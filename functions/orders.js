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

function formatOrder(order) {
    order.phoneOne = `(${order.phoneOne.slice(0, 3)}) ${order.phoneOne.slice(3, 6)}-${order.phoneOne.slice(6, 10)}`
    order.phoneTwo = `(${order.phoneTwo.slice(0, 3)}) ${order.phoneTwo.slice(3, 6)}-${order.phoneTwo.slice(6, 10)}`

    let dDate = new Date(order.danceDate)
    const months = ["Jan.", "Feb.", "March", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
    let month = months[dDate.getMonth()]

    let oDate = new Date(order.orderDate)
    let oMonth = months[oDate.getMonth()]

    order.formatDanceDate = `${month} ${dDate.getDate()}`
    order.formatOrderDate = `${oMonth} ${oDate.getDate()}`

    return (order)
}

const deleteBadOrders = async () => {
    console.log('in function')

    let res = await fetch(`/api/orders/delete`, {
      method: 'POST',
    })
    res = await res.json()
    // console.log(res)
    // console.log('delete bad orders')
  }


export {setDate, getTotal, formatOrder, deleteBadOrders}