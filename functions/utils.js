export const capitalize = (str) => {
    const capArr = str.split(" ").map((strng) => {
         return strng.charAt(0).toUpperCase() + strng.slice(1)
    })
    return capArr.join(' ')
}

const isBrowser = () => typeof window !== 'undefined'

export function scrollToTop() {
    if (!isBrowser()) return
    window.scrollTo({ top: 0, behavior: 'smooth' })
}