export interface IUser {
	id: number
	email: string
	first_name: string
	last_name: string
	phone_number: string
	description: string
}

export interface IAuthResponse {
	access_token: string
}

export interface ISignupPayload {
	email: string
	first_name: string
	last_name: string
	phone_number: string
	description: string
	password: string
	confirm_password: string
}
