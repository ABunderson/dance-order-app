import { sha512 } from 'crypto-hash'

export async function  hashPassword(value) {
    let result = ''
    result = await sha512(value)
    return result
}

export default hashPassword
