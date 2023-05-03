import { IUser } from '@/types'
import { client } from '../../client'

/**
 * Текущий пользователь
 */
export default function (): Promise<IUser> {
	return client
		.get('/me/')
		.then(res => res.data)
		.catch(err => {
			throw err
		})
}
