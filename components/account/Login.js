

export default async function Login(userArray) {
    // console.log('in login function')
    // console.log(userArray)
    // console.log('check database')
    // console.log(getUser('Tina', '141bfcc78eb25468076d2f03a95e6e750176354f6ec9a974b49d7ce4cc82d35c9e681046f75e0f69eb006410fc240a6b15588a73a922d314411cea37ab97febb'))
    const status = await fetchUser(userArray.userName, userArray.password)
    console.log('status = ' + status)
}

async function fetchUser(userName, password) {
    const response = await fetch(`/api/users/${userName}/${password}`)
    const data = await response.json()
    return data.users.length === 1 ? true : false
}