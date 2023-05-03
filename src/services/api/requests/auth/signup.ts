import { IAuthResponse, ISignupPayload } from '@/types'
import { client } from '../../client'

/**
 * Запрос на регистрацию
 */
export default function (payload: ISignupPayload): Promise<IAuthResponse> {
	return client
		.post('/signup/', payload)
		.then(res => res.data.data)
		.catch(err => {
			throw err
		})
}
