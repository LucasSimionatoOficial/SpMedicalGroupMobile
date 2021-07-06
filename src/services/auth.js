import AsyncStorage from '@react-native-async-storage/async-storage'

export const userData = async () => {
    let token = await AsyncStorage.getItem('jwt_key')
    let data64 = await token.split('.')[1]
    let data = await window.atob(data64)
    return await JSON.parse(data)
}

export const userExpired = () => {
    return new Date(userData.exp * 1000).getTime() <= new Date().getTime()
}