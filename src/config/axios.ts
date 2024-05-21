import { useAuthStore } from '@/storage/auth'
import { getAuthorization } from '@/utils'
import axios from 'axios'
import { env } from './env'

const API_URL = env.get('API_URL').required().asString()

const instance = axios.create({
	withCredentials: true,
	baseURL: API_URL + '/api',
})

instance.interceptors.request.use(config => {
	const token = useAuthStore.getState().token

	if (token) {
		config.headers.Authorization = getAuthorization(token)
	}

	return config
})

instance.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config

		const isValidStatus = error.response.status === 403

		const isConfigExist = !!error.config

		const isNotRepeat = !error.config.isRestry

		if (isValidStatus && isConfigExist && isNotRepeat) {
			originalRequest.isRestry = true
			try {
				await useAuthStore.getState().getNewAccessToken()

				return instance.request(originalRequest)
			} catch (e) {
				console.error(e)

				useAuthStore.getState().reset()
			}
		}

		throw error
	},
)

export default instance
