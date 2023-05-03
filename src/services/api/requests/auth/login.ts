import { client } from '../../client'

interface IResponse {
	access_token: string
}

/**
 * Запрос на авторизацию
 */
export default async function (payload: {
	email: string
	password: string
}): Promise<IResponse> {
	return client
		.post('/signin/', payload)
		.then(res => res.data.data)
		.catch(err => {
			throw err
		})
}
