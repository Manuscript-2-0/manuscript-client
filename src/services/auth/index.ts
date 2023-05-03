import { reactive, readonly } from 'vue'
import { login, signup } from '../api'
import { KEYS } from './types'
import { ISignupPayload } from '@/types'

const storage = window.localStorage

const state = reactive({
	token: storage.getItem(KEYS.ACCESS_TOKEN) || ''
})

const isAuthorized = () => {
	return !!state.token
}

const setAccessToken = (token: string) => {
	state.token = token
	storage.setItem(KEYS.ACCESS_TOKEN, token)
}

const getToken = () => {
	return state.token
}

const logout = () => {
	state.token = ''
	storage.removeItem(KEYS.ACCESS_TOKEN)

	window.location.reload()
}

const loginUser = async (email: string, password: string) => {
	if (isAuthorized()) {
		return Promise.resolve()
	}

	const { access_token } = await login({ email, password })
	setAccessToken(access_token)
}

const signupUser = async (user: ISignupPayload) => {
	const { access_token } = await signup(user)
	setAccessToken(access_token)
}

const AuthService = {
	state: readonly(state),
	isAuthorized,
	loginUser,
	signupUser,
	logout,
	getToken
}

export { AuthService }
