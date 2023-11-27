import { sha512 } from 'crypto-hash'

async function  hashPassword(value) {
    let result = ''
    result = await sha512(value)
    return result
}

const setColorObject = (colors) => {
    let pathString = 'empty'
    let pathObj
    
    if (colors) {
        pathObj = [...colors]

        pathString = JSON.stringify({pathObj})
    }
    return pathString
}

export {hashPassword, setColorObject}