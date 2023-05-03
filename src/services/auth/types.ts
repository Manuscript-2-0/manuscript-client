import { IAuthResponse, ISignupPayload, IUser } from '@/types'

export interface IState {
	accessToken: string | null
	user: IUser | null
}

export interface IAuthService {
	state: IState
	logout: () => void
	isAuthorized: () => boolean
	loginUser: (email: string, password: string) => Promise<IAuthResponse>
	signupUser: (user: ISignupPayload) => Promise<IUser>
}

export enum KEYS {
	ACCESS_TOKEN = 'accessToken'
}
