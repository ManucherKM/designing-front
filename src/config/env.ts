import { from } from 'env-var'

export const env = from({
	API_URL: import.meta.env.VITE_API_URL,

	CLIENT_URL: import.meta.env.VITE_CLIENT_URL,

	IS_DEVELOPMENT: import.meta.env.VITE_IS_DEVELOPMENT,
})
