import axios from 'axios'
import { env } from './env'

const API_URL = env.get('API_URL').required().asString()

const instance = axios.create({
	withCredentials: true,
	baseURL: API_URL + '/api',
})

export default instance
