import {setItem, getItem} from '@react-native-async-storage/async-storage'
import axios from 'axios'

const api = axios.create({
    baseURL : 'http://localhost:5000/api'
})

export default api