import axios from 'axios'
import { AuthService } from '../auth'

const client = axios.create({
	baseURL: import.meta.env.VITE_API_PROXY
})

client.interceptors.request.use(config => {
	config.headers['Accept'] = 'application/json'

	if (AuthService.isAuthorized()) {
		config.headers['Authorization'] = `Bearer ${AuthService.getToken()}`
	}

	return config
})

client.interceptors.response.use(
	response => response,
	error => {
		if (error.response.status === 403) {
			AuthService.logout()
		}
		return Promise.reject(error)
	}
)

export { client }
