export const capitalize = (str) => {
    const capArr = str.split(" ").map((strng) => {
         return strng.charAt(0).toUpperCase() + strng.slice(1)
    })
    return capArr.join(' ')
}