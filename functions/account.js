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

async function login(userName, password) {
    const response = await fetch(`/api/users/${userName}/${password}`)
    const data = await response.json()
    return data.users.length === 1 ? true : false
}

export {hashPassword, setColorObject, login}